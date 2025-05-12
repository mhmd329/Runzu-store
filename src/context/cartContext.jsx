import React, { createContext, useEffect, useState } from "react";
import { allProducts } from "../components/data/products";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react-refresh/only-export-components
export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [products] = useState(allProducts);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  ); // لإدارة الطلبات

  // بيانات العميل من الفورم
  const [customerData, setCustomerData] = useState({
    name: '',
    address: '',
    phone: ''
  });


  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };

  const BuyCart = (e, navigate) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      toast.error("السلة فارغة");
      return;
    }

    if (!customerData.name || !customerData.address || !customerData.phone) {
      toast.info("من فضلك أدخل جميع البيانات");
      return;
    }

    const totalAmount = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // حفظ الطلب
    setOrders((prev) => [
      ...prev,
      {
        customer: customerData,
        items: cartItems,
        totalAmount,
        date: new Date().toLocaleString(),
      },
    ]);

    setCartItems([]);
    toast.success("تم الطلب بنجاح!")
    // حفظ الطلب
    // const order = {
    //   customer: customerData,
    //   items: cartItems,
    //   totalAmount,
    //   date: new Date().toLocaleString(),
    // };

    // setOrders((prev) => [...prev, order]);

    // setCartItems([]);  // مسح السلة بعد إتمام الطلب
    // toast.success("تم الطلب بنجاح!");
    console.log(customerData); // للتحقق من القيم في state
    console.log(cartItems); // للتحقق من سلة المشتريات

    console.log(orders)
    // التوجيه بعد وقت بسيط
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  // دالة لحذف الطلب
  const removeOrder = (index) => {
    // حذف الطلب من الـ state
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);  // تحديث الـ state

    // تحديث الـ localStorage
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity > 1) {
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          return prevItems.filter((item) => item.id !== product.id);
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

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

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
        handleCustomerInput, // مهم لإرسال البيانات من الفورم
      }}
    >

      {children}
    </Context.Provider>
  );
};
