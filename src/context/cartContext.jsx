import React, { createContext, useEffect, useState } from "react";
import { allProducts } from "../components/data/products";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useCreateOrder} from '../components/hooks/useCreateOrder'; // استيراد الهوك

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products] = useState(allProducts);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [orders, setOrders] = useState(); // لإدارة الطلبات
  const { mutate: createOrder, isLoading, isError, error, isSuccess } = useCreateOrder();

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
      toast.error("السلة فارغة");
      return;
    }
  
    if (!customerData.name || !customerData.address || !customerData.phone) {
      toast.info("من فضلك أدخل جميع البيانات");
      return;
    }
  
    const orderData = {
      customer: customerData,
      items: cartItems,
      totalAmount: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      date: new Date().toLocaleString(),
    };
    // إرسال الطلب وانتظار النتيجة
   // استخدام mutate بدلاً من mutateAsync
  createOrder(orderData, {
    onSuccess: () => {
      toast.success("تم إرسال الطلب بنجاح!");
      navigate('/');
    },
    onError: (error) => {
      toast.error("حدث خطأ أثناء إرسال الطلب");
      console.error("Error while creating order:", error);
    },
  });
};
  
  // دالة لحذف الطلب
  const removeOrder = (index) => {
    // حذف الطلب من الـ state
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);  // تحديث الـ state

    // تحديث الـ localStorage
  };
  const handleAddToCart = (product) => {
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
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
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
        products,
        cartItems,
        handleAddToCart,
        handleRemoveFromCart,
        totalQuantity,
        totalPrice,
        BuyCart,
        isOpen,
        openCart,
        closeCart,
        orders,
        customerData,
        removeOrder,
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
