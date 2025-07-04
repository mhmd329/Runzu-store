import React, { useContext } from 'react';
import { Context } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, customerData, totalPrice, BuyCart, handleCustomerInput } = useContext(Context);
  const navigate = useNavigate();
const BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL_TEST;
  return (
    <div className="flex flex-col md:flex-row justify-around items-start gap-10 min-h-screen bg-gray-50 p-10">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout Page</h1>
        <form onSubmit={(e) => BuyCart(e, navigate)}>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleCustomerInput}
              value={customerData.name}  // ربط البيانات مع الـ state
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-2">address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="your address "
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleCustomerInput}
              value={customerData.address}  // ربط البيانات مع الـ state
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">phone number </label>
            <input
              id="phone"
              name="phone"
              type="text"
              placeholder="your number"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleCustomerInput}
              value={customerData.phone}  // ربط البيانات مع الـ state
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-700"
          >
            Order Now
          </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-center">your cart products</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {cartItems.map((item, index) => (
            <div key={item._id && index} className="flex gap-4 border-b pb-3">
              <img
                loading="lazy"
                src={`${BASE_URL}${item.Image}`}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  EGP {item.price * item.quantity}
                </p>
                <p>{item.quantity}</p>
                <p>{item.selectedSize}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right font-semibold">
          Total: EGP {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
