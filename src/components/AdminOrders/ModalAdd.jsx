import React, { useState } from "react";
import { useAddProducts } from "../hooks/useProducts";
import { toast } from "react-toastify";

const ModalAdd = ({ closeModal }) => {
    const { mutateAsync } = useAddProducts();

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [status, setStatus] = useState("available");
    const [sizes, setSizes] = useState([]);
    const [images, setImages] = useState([]);

    const handleSizeChange = (e) => {
        const value = e.target.value;
        setSizes((prev) =>
            prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
        );
    };

    const handleImageChange = (e) => {
        // نجمع الصور الجديدة مع القديمة
        setImages((prev) => [...prev, ...Array.from(e.target.files)]);
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("category", category);
        formData.append("price", price);
        formData.append("status", status);
        formData.append("sizes", JSON.stringify(sizes));
        images.forEach((img) => {
            formData.append("images", img);
        });

        try {
            await mutateAsync(formData);
            toast(`your new product added sucsessfuly ✅`)
            closeModal();
        } catch (error) {
            console.error("Upload error:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex flex-col justify-center items-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white relative p-6 rounded shadow-lg w-[90%] max-w-md space-y-4 overflow-scroll"
            >
                <h2 className="text-xl font-bold mt-4 mb-2">Add Product</h2>

                <div>
                    <label className="block">Product Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border p-2 w-full rounded"
                    >
                        <option value="pants">pants</option>
                        <option value="tshirts"> tshirts</option>
                    </select>
                </div>

                <div>
                    <label className="block">Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border p-2 w-full rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block">Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border p-2 w-full rounded"
                    >
                        <option value="available">Available</option>
                        <option value="not avialible"> not avialible</option>
                    </select>
                </div>

                <div>
                    <label className="block">Sizes</label>
                    <div className="flex gap-2">
                        {["S", "M", "L", "XL","XXL"].map((size) => (
                            <label key={size}>
                                <input
                                    type="checkbox"
                                    value={size}
                                    onChange={handleSizeChange}
                                    checked={sizes.includes(size)}
                                />
                                {size}
                            </label>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block mb-2">Images (main + gallery)</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                        id="fileInput"
                    />
                    <label
                        htmlFor="fileInput"
                        className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded mb-2"
                    >
                        Choose Images
                    </label>

                    <div className="flex flex-wrap gap-3 max-w-full overflow-hidden">
                        {images.map((image, index) => (
                            <div key={index} className="relative w-24 h-24 rounded overflow-hidden border border-gray-300">
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={() => removeImage(index)}
                                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex justify-between mt-4">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                    <button
                        onClick={closeModal}
                        type="button"
                        className="bg-red-500 text-white px-4 py-2 absolute top-0 left-0 rounded"
                    >
                        x
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ModalAdd;
