import React, { useState } from "react";
import { FaTshirt } from "react-icons/fa";
import { PiPantsLight } from "react-icons/pi";
import Pants from "./Pants";
import Tshirt from "./Tshirt";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleShowPants = () => {
    setSelectedCategory("pants");
  };

  const handleShowTshirts = () => {
    setSelectedCategory("tshirts");
  };

  return (
    <div className="flex justify-center items-center mt-8 space-x-8 bg-gray-100">
      <button
        onClick={handleShowPants}
        className="flex flex-col items-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl shadow-lg transition duration-300"
      >
        <PiPantsLight size={40} /> 
        <span className="mt-2 text-sm">بناطيل</span>
      </button>

      <button
        onClick={handleShowTshirts}
        className="flex flex-col items-center bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-xl shadow-lg transition duration-300"
      >
        <FaTshirt size={40} /> 
        <span className="mt-2 text-sm">تيشيرتات</span>
      </button>

      
      <div className="mt-8">
        {selectedCategory === "pants" && <Pants/>}
        {selectedCategory === "tshirts" && <Tshirt/>}
      </div>
    </div>
  );
};

export default Home;
