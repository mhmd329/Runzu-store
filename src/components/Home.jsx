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
    <>
      <div className="flex justify-center items-center mt-8 space-x-8 bg-gray-200 py-4">
        <button
          onClick={handleShowPants}
          className={`flex flex-col items-center cursor-pointer py-4 px-6 rounded-xl shadow-lg transition duration-300 
      ${selectedCategory === "pants" ? "bg-gray-700" : "bg-gray-500 hover:bg-gray-700"} text-white`}
        >
          <PiPantsLight size={40} />
          <span className="mt-2 text-sm">Pants</span>
        </button>

        <button
          onClick={handleShowTshirts}
          className={`flex flex-col items-center cursor-pointer py-4 px-6 rounded-xl shadow-lg transition duration-300 
      ${selectedCategory === "tshirts" ? "bg-gray-700" : "bg-gray-500 hover:bg-gray-700"} text-white`}
        >
          <FaTshirt size={40} />
          <span className="mt-2 text-sm">T-Shirt</span>
        </button>
      </div>

      <div className="mt-8">
        <div className="text-center">
          <p>m:55,65</p>
          <p>l:55,65</p>
          <p>xl:55,65</p>
        </div>
        {selectedCategory === "pants" && <Pants />}
        {selectedCategory === "tshirts" && <Tshirt />}
      </div>
    </>

  );
};

export default Home;
