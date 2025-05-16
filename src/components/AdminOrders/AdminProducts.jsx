import React, { useContext, useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Context } from "../../context/cartContext";
import ModalAdd from "./ModalAdd";
import { useDeleteProduct } from "../hooks/useProducts";
import { toast } from "react-toastify";
import ModalEdit from "./ModalEdit";
const AdminProducts = () => {
    const { products } = useContext(Context);
    const [modalAdd, setModalAdd] = useState(false);
    const [modalEditProduct, setModalEditProduct] = useState(null);  // null أو منتج

    const { mutate: deleteProduct } = useDeleteProduct();

    const handleDelete = (productId) => {
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (confirmDelete) {
            deleteProduct(productId);
            toast(`you deleted product ${productId}`);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Products Control</h1>
                <button
                    onClick={() => setModalAdd(true)}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
                >
                    <FaPlus /> Add Product
                </button>
            </div>
            {modalAdd && (
                <ModalAdd closeModal={() => setModalAdd(false)} />
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 shadow rounded">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="py-2 px-4 border-b">Image</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Category</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">
                                    <img
                                        loading="lazy"
                                        src={`https://back-runzu-production.up.railway.app${product?.gallery?.[0] || product.Image}`}
                                        alt={product.name}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.price} EGP</td>
                                <td className="py-2 px-4 border-b capitalize">{product.category}</td>
                                <td className={`py-2 px-4 border-b font-semibold ${product.status === "available" ? "text-green-600" : "text-red-600"}`}>
                                    {product.status}
                                </td>
                                <td className="py-2 px-4 border-b text-center">
                                    <div className="flex justify-center gap-4">
                                        <button
                                            onClick={() => setModalEditProduct(product)}  // خزن المنتج الذي سيتم تعديله
                                            className="text-blue-600 hover:text-blue-800 cursor-pointer"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-red-600 hover:text-red-800 cursor-pointer"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products?.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* هنا نعرض المودال الخاص بالتعديل خارج الجدول */}
            {modalEditProduct && (
                <ModalEdit
                    Product={modalEditProduct}
                    closeModal={() => setModalEditProduct(null)}
                />
            )}
        </div>
    );
};


export default AdminProducts;
