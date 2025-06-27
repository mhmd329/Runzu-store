import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { Context } from "../../context/cartContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    products,
    handleAddToCart,
    selectedSizes,
    handleSizeChange,
  } = useContext(Context);

  const product = products.find((p) => p._id == String(id));

  if (!product) return <div className="text-center p-4">Product not found</div>;

  const BASE_URL = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_BASE_URL_PROD
    : import.meta.env.VITE_BASE_URL_TEST;
  /* الصورة الرئيسيّة (تُضبط على أوّل صورة في الـ gallery) */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mainImage, setMainImage] = useState(
    product.gallery?.[0] ? `${BASE_URL}${product.gallery[0]}` : `${BASE_URL}${product.Image}`
  );


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">{product.name}</h1>

      {/* ====== معرض الصور ====== */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* الصورة الكبيرة مع أنيميشن لطيفة */}
        <motion.img
          loading="lazy"
          key={mainImage} // ليتغير الـ motion عند تبديل الصورة
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          src={mainImage}
          alt="main"
          className="w-full md:w-1/2 rounded-xl object-cover shadow-lg"
        />

        {/* الشرائط المصغّرة جهة اليمين (أو تحت في الموبايل) */}
        <div className="flex md:flex-col gap-3 md:gap-4 overflow-x-auto md:overflow-y-auto">
          {product.gallery.map((img, i) => (
            <img
              loading="lazy"
              key={i}
              src={`${BASE_URL}${img}`}
              alt={`thumb-${i}`}
              onClick={() => setMainImage(`${BASE_URL}${img}`)}
              className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-md cursor-pointer border-2
  ${mainImage === `${BASE_URL}${img}` ? "border-gray-700" : "border-transparent"}
           `}
            />

          ))}
        </div>
      </div>

      {/* ====== التفاصيل والشراء ====== */}
      <div className="mt-8 flex flex-col gap-6">
        <p className="text-gray-700 text-lg">
          <span className="font-semibold">Price:</span> {product.price} EGP
        </p>

        <p className="text-sm text-gray-500">
          <span className="font-semibold">Category:</span> {product.category}
        </p>

        {/* اختيار المقاس */}
        <div>
          <p className="font-semibold mb-2">Available Sizes:</p>
          <select
            className="border rounded-md p-2"
            value={selectedSizes[product.id] || ""}
            onChange={(e) => handleSizeChange(product.id, e.target.value)}
          >
            <option value="">choose size</option>
            {product.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* حالة التوفّر */}
        <p
          className={`font-semibold ${product.status === "available" ? "text-green-600" : "text-red-600"
            }`}
        >
          {product.status}
        </p>

        {/* زر الإضافة إلى السلة */}
        <button
          onClick={() =>
            selectedSizes[product.id] &&
            handleAddToCart({
              ...product,
              selectedSize: selectedSizes[product.id],
            })
          }
          disabled={
            product.status !== "available" || !selectedSizes[product.id]
          }
          className={`py-2 px-4 rounded-lg text-white transition cursor-pointer
            ${product.status === "available" && selectedSizes[product.id]
              ? "bg-gray-700 hover:bg-gray-800"
              : "bg-gray-400 cursor-not-allowed"
            }`}
        >
          {product.status !== "available"
            ? "not available"
            : !selectedSizes[product.id]
              ? "choose size first"
              : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
