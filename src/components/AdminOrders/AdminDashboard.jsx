import { useState } from "react";
import AdminOrders from "./AdminOrders";
import AdminProducts from "./AdminProducts";

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("products");

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-200 text-gray-800 p-6 space-y-4 fixed h-full">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

                <button
                    onClick={() => setActiveTab("products")}
                    className={`w-full text-left py-2 px-4 rounded-lg transition 
            ${activeTab === "products" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}
          `}
                >
                    📦 Products
                </button>

                <button
                    onClick={() => setActiveTab("orders")}
                    className={`w-full text-left py-2 px-4 rounded-lg transition 
            ${activeTab === "orders" ? "bg-gray-700 text-white" : "hover:bg-gray-700"}
          `}
                >
                    🧾 Orders
                </button>
            </aside>

            {/* Main Content */}
            <main className="ml-64 flex-1 p-8 bg-gray-50 min-h-screen">
                {activeTab === "products" && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Products Management</h1>

                        <AdminProducts />
                    </div>
                )}

                {activeTab === "orders" && (
                    <div>
                        <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
                        <AdminOrders />
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
