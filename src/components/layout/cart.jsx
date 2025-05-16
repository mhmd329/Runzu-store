import React, { useContext } from "react";
import { Context } from "../../context/cartContext";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { openCart, isOpen, totalQuantity, totalPrice, cartItems, closeCart, handleRemoveFromCart, handleAddToCart } = useContext(Context);

  // داخل كمبوننت Cart
  const navigate = useNavigate();

  return (
    <>
      {/* Cart Button */}
      <button
        className="relative cursor-pointer w-12 h-12 rounded-full border border-gray-800 text-gray-800 flex items-center justify-center"
        onClick={openCart}
      >
        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
        </svg>

        {/* Badge */}
        <div className="absolute -bottom-1 -right-1 bg-white text-black text-xs w-4 h-4 rounded-full flex items-center justify-center border">
          {totalQuantity}
        </div>
      </button>

      {/* Backdrop + Slide Cart */}
      {isOpen && (
        <>
        
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeCart}
          ></div>

          {/* Slide-in Cart */}
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Your Cart</h2>
              <button
                className="text-red-600 cursor-pointer hover:text-red-800 text-sm"
                onClick={closeCart}
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id && index}
                  className="flex justify-between gap-3 border-b pb-3"
                >
                  {/* صورة المنتج */}
                  <img
                    loading="lazy"
                    src={`https://back-runzu-production.up.railway.app${item.Image}`}
                    alt={item.name}
                    className="w-16 h-16 rounded-md object-cover"
                  />

                  {/* تفاصيل المنتج */}
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="text-sm text-right font-medium">{item.name}</h3>

                    {/* الكمية والتحكم */}
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        className="bg-gray-200 px-2 cursor-pointer rounded"
                        onClick={() => handleRemoveFromCart(item)}
                      >
                        -
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        className="bg-gray-200 px-2 cursor-pointer rounded"
                        onClick={() => handleAddToCart(item)}
                      >
                        +
                      </button>
                    </div>

                    {/* السعر */}
                    <div className="text-xs text-gray-600 mt-1">
                      EGP {item.price * item.quantity}
                      <p className="text-xs text-gray-600">Size: {item.selectedSize}</p> {/* عرض المقاس هنا */}

                    </div>
                  </div>
                </div>
              ))}

            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <button
                className="w-full bg-gray-600 cursor-pointer hover:bg-gray-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                onClick={() => {
                  closeCart();      // يقفل السايد بار
                  navigate("/checkout"); // يروح للشيك أوت
                }}
              >
                Checkout
              </button>
              <span>
                EGP{totalPrice}
              </span>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
