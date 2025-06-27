import React, { useContext } from "react";
import { Context } from "../../context/cartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Pants = () => {
  const { products, handleAddToCart, selectedSizes, handleSizeChange } = useContext(Context); // استخدم القيم من الـ Context
  const FilteredProducts = products?.filter(
    (product) => product.category === "pants"
  ) || [];

  const navigate = useNavigate()
const BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL_TEST;
  return (
    <div className="grid bg-gray-100 grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {FilteredProducts.length > 0 ? (
        FilteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            className="bg-white flex flex-col shadow-md rounded-xl p-4 items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <img
              loading="lazy"
              onClick={() => navigate(`/product/${product._id}`)}
              className="w-28 h-28 object-cover cursor-pointer rounded-md mb-2"
              src={`${BASE_URL}${product.Image}`}
              alt={product.name}
            />
            <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-2">{product.price} EGP</p>

            <select
              className="mb-2 p-1 border rounded-md"
              value={selectedSizes[product.id] || ""}
              onChange={(e) => handleSizeChange(product.id, e.target.value)}
            >
              <option value="">size?</option>
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>

            <button
              onClick={() =>
                selectedSizes[product.id] &&
                handleAddToCart({ ...product, selectedSize: selectedSizes[product.id] })
              }
              disabled={
                product.status !== "available" || !selectedSizes[product.id]
              }
              className={`py-1 px-3 rounded-md text-white transition
          ${product.status === "available" && selectedSizes[product.id]
                  ? "bg-gray-500 hover:bg-gray-600 cursor-pointer"
                  : "bg-gray-400 cursor-not-allowed"}
        `}
            >
              {product.status !== "available"
                ? "Not available"
                : !selectedSizes[product.id]
                  ? "Choose size first!"
                  : "Add to Cart"}
            </button>
          </motion.div>
        ))
      ) : (
        <div className="flex justify-center col-span-full">
          <h1 className="text-center text-gray-500">pants comming soon</h1>
        </div>
      )}

    </div>
  );
};

export default Pants;
