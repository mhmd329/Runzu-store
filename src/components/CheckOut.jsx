import React, { useContext } from 'react';
import { Context } from '../context/cartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems,customerData ,totalPrice, BuyCart, handleCustomerInput } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row justify-around items-start gap-10 min-h-screen bg-gray-50 p-10">
      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-6 text-center">Checkout Page</h1>
        <form onSubmit={(e) => BuyCart(e, navigate)}>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">الاسم</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              placeholder="ادخل اسمك" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleCustomerInput}
              value={customerData.name}  // ربط البيانات مع الـ state

              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium mb-2">العنوان</label>
            <input 
              id="address" 
              name="address" 
              type="text" 
              placeholder="ادخل عنوانك" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleCustomerInput}
              value={customerData.adress}  // ربط البيانات مع الـ state

              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium mb-2">رقم الهاتف</label>
            <input 
              id="phone" 
              name="phone" 
              type="text" 
              placeholder="ادخل رقم هاتفك" 
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              onChange={handleCustomerInput}
              value={customerData.phone}  // ربط البيانات مع الـ state

              required
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            تأكيد الطلب
          </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full lg:w-1/3">
        <h2 className="text-xl font-semibold mb-4 text-center">سلة المشتريات</h2>
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 border-b pb-3">
              <img
                src={item.Image}
                alt={item.name}
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  EGP {item.price * item.quantity}
                </p>
                <p>{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-right font-semibold">
          الإجمالي: EGP {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
