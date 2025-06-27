import React, { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';
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

 const BuyCart = async (e, navigate) => {
  e.preventDefault();

  if (cartItems.length === 0) {
    toast.error("السلة فارغة");
    return;
  }

  if (!customerData.name || !customerData.address || !customerData.phone) {
    toast.info("يجب ملء جميع بيانات العميل");
    return;
  }

  const orderData = {
    name: customerData.name,       
    phone: customerData.phone,    
    address: customerData.address, 
    products: cartItems.map(item => ({
      name: item.name,
      selectedSize: item.selectedSize,
      quantity: item.quantity,
      price: item.price,
      Image: item.Image
    })),
    total: totalPrice
  };

  createOrder(orderData, {
    onSuccess: () => {
      toast.success("تم إنشاء الطلب بنجاح ✅");
      navigate('/');
            setCartItems([]);
            
            sessionStorage.removeItem("cartItems");    },
    onError: (error) => {
      toast.error("خطأ في الخادم");
      console.error("Error creating order:", error);
    }
  });
};


  const handleAddToCart = (product) => {
    openCart()
    setCartItems((prevItems) => {

      const existingItem = prevItems.find(
        (item) => item._id === product._id && item.selectedSize === product.selectedSize
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id && item.selectedSize === product.selectedSize
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
      const existingItem = prevItems.find((item) => item._id === product._id && item.selectedSize === product.selectedSize);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item._id === product._id && item.selectedSize === product.selectedSize
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevItems.filter((item) => item._id !== product._id || item.selectedSize !== product.selectedSize);
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
        products: allProducts || [],
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
        handleCustomerInput,
      }}
    >

      {children}
    </Context.Provider>
  );
};