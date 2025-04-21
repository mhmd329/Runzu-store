import React, { useContext } from "react";
import { Context } from "../context/cartContext";

const Cart = () => {
  const { openCart, isOpen, totalQuantity, cartItems, closeCart } = useContext(Context);

  return (
    <>
      {/* Cart Button */}
      <button
        className="relative w-8 h-8 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center"
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
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
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
                className="text-red-600 hover:text-red-800 text-sm"
                onClick={closeCart}
              >
                ✕
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 border-b pb-2"
                  >
                    <img
                      src={item.Image}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-sm font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500">${item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium"
                onClick={() => alert("Checkout Coming Soon!")}
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
