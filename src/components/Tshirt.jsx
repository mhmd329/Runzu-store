import React, { useContext } from "react";
import { Context } from "../context/cartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
const Tshirt = () => {
  const { products, handleAddToCart } = useContext(Context)
  const FilteredProducts = products.filter((product ) => product.category === "tshirts")
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
       {FilteredProducts.map((product, index) => (
        <motion.div
        key={product.id}
        className="bg-white flex flex-col shadow-md rounded-xl p-4 items-center text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: index * 0.1 }}
      >
        <img alt={product.name} src={product.Image} className="w-28 h-28 object-cover rounded-md mb-6"/>
        <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-600 mb-2">{product.price} EGP</p>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-gray-500 cursor-pointer text-white py-1 px-3 rounded-md hover:bg-gray-600 transition"
          >
            Add to Cart
          </button>    
             </motion.div>
      ))}
    </div>
  )
};

export default Tshirt;
