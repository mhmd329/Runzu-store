import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateOrder } from '../components/hooks/useCreateOrder'; // استيراد الهوك
import { useGetProducts } from "../components/hooks/useProducts";
// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState(
    JSON.parse(sessionStorage.getItem("cartItems")) || []
  );
  const { mutate: createOrder, isLoading, isError, error, isSuccess } = useCreateOrder();
  const { data: allProducts } = useGetProducts();
  // بيانات العميل من الفورم
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    phone: ''
  });
  const [selectedSizes, setSelectedSizes] = useState({});

  // دالة لتحديث المقاسات
  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };
  // دالة لإرسال الطلب
  const BuyCart = async (e, navigate) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error(" cart empty");
      return;
    }

    if (!customerData.name || !customerData.address || !customerData.phone) {
      toast.info("fill inputs info");
      return;
    }

    const orderData = {
      customer: customerData,
      items: cartItems,
      totalAmount: totalPrice,
      date: new Date().toLocaleString(),
    };
    // إرسال الطلب وانتظار النتيجة
    // استخدام mutate بدلاً من mutateAsync
    createOrder(orderData, {
      onSuccess: () => {
        toast.success("order success!");
        navigate('/');
      },
      onError: (error) => {
        toast.error("server error");
        console.error("Error while creating order:", error);
      },
    });
  };


  const handleAddToCart = (product) => {
    openCart()
    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // إذا كان العنصر غير موجود، أضفه كمقاس جديد
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id && item.selectedSize === product.selectedSize);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item.id === product.id && item.selectedSize === product.selectedSize
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevItems.filter((item) => item.id !== product.id || item.selectedSize !== product.selectedSize);
        }
      }
      return prevItems;
    });
  };

  // تعديل بيانات العميل عند التغيير في الحقول
  const handleCustomerInput = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Context.Provider
      value={{
        products: allProducts || [], // ✅ نحط default []
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        totalQuantity,
        totalPrice,
        BuyCart,
        isOpen,
        openCart,
        closeCart,
        customerData,
        selectedSizes,
        handleSizeChange,
        isLoading,
        isError,
        error,
        isSuccess,
       
        handleCustomerInput, // مهم لإرسال البيانات من الفورم
      }}
    >

      {children}
    </Context.Provider>
  );
};
