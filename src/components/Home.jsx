import React, { useState } from "react";
import { FaTshirt } from "react-icons/fa";
import { PiPantsLight } from "react-icons/pi";
import Pants from "./layout/Pants";
import Tshirt from "./layout/Tshirt";
const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("pants");

  const sizeRanges = [
    { label: "M", min: 55, max: 65 },
    { label: "L", min: 65, max: 75 },
    { label: "XL", min: 75, max: 90 },
    { label: "XXL", min: 90, max: ">>" },
  ];

  return (
    <>
    <div
  className="w-screen h-[300px] bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center px-4 mt-6"
  style={{ backgroundImage: "url('/newLogo.jpg')" }}
>
  {/* محتوى هنا */}
</div>

      <div
        className="flex justify-center items-center mt-8 space-x-8 py-4 bg-cover bg-center"
      >

        <button
          onClick={() => setSelectedCategory("pants")}
          className={`flex flex-col items-center py-4 px-6 rounded-xl shadow-lg transition duration-300
            ${selectedCategory === "pants"
              ? "bg-gray-700 text-white"
              : "bg-gray-500 text-white hover:bg-gray-700"
            }`}
        >
          <PiPantsLight size={40} />
          <span className="mt-2 text-sm">Pants</span>
        </button>

        <button
          onClick={() => setSelectedCategory("tshirts")}
          className={`flex flex-col items-center py-4 px-6 rounded-xl shadow-lg transition duration-300
            ${selectedCategory === "tshirts"
              ? "bg-gray-700 text-white"
              : "bg-gray-500 text-white hover:bg-gray-700"
            }`}
        >
          <FaTshirt size={40} />
          <span className="mt-2 text-sm">T-Shirt</span>
        </button>
      </div>

      {/* Size Guide */}
      <div className="mt-8 max-w-md mx-auto">
        <h2 className="text-center text-lg font-semibold mb-4">Size Guide (cm)</h2>
        <div className="grid grid-cols-4 gap-4 text-center">
          {sizeRanges.map(({ label, min, max }) => (
            <div
              key={label}
              className="p-2 border rounded-lg bg-white shadow-sm"
            >
              <p className="font-medium">{label}</p>
              <p className="text-sm text-gray-600">{min}–{max}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Product List */}
      <div className="mt-8">
        {selectedCategory === "pants" && <Pants />}
        {selectedCategory === "tshirts" && <Tshirt />}
      </div>
    </>
  );
};

export default Home;
