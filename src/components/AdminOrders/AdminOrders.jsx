import React from "react";
import { useDeleteOrder, useGetOrders } from '../hooks/useCreateOrder'; // تصحيح مسار الاستيراد
import { toast } from 'react-toastify';

const AdminOrders = () => {
    const { data: orders, isLoading, isError, error } = useGetOrders();
    const { mutate: deleteOrder, isLoading: isDeleting } = useDeleteOrder();



    const handleDeleteOrder = (orderId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
            deleteOrder(orderId, {
                onSuccess: () => toast.success('تم حذف الطلب بنجاح'),
                onError: () => toast.error('فشل في حذف الطلب')
            });
        }
    };


    if (isLoading) return <div className="text-center py-8">جاري تحميل الطلبات...</div>;
    if (isError) return <div className="text-center py-8 text-red-500">خطأ في تحميل الطلبات: {error.message}</div>;

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-center">قائمة الطلبات</h1>

            {orders?.length === 0 ? (
                <p className="text-center text-gray-500">لا توجد طلبات حالياً.</p>
            ) : (
                <div className="space-y-6">
                    {orders?.map((order) => (
                        <div key={order.id} className="bg-white shadow-md p-5 rounded-md">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold mb-2">الطلب #{order.id}</h2>
                                <span className="text-sm text-gray-500">{order.date}</span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                <div className="border p-3 rounded">
                                    <h3 className="font-medium border-b pb-1">معلومات العميل</h3>
                                    <p className="mt-2"><span className="font-medium">الاسم:</span> {order.customer.name}</p>
                                    <p><span className="font-medium">العنوان:</span> {order.customer.address}</p>
                                    <p><span className="font-medium">الهاتف:</span> {order.customer.phone}</p>
                                </div>

                                <div className="md:col-span-2">
                                    <h3 className="font-medium border-b pb-1">المنتجات</h3>
                                    <ul className="divide-y">
                                        {order.items.map((item, i) => (
                                            <li key={i} className="py-3 flex items-start gap-4">
                                 
                                                <div className="flex-1">
                                                    <p className="font-medium">{item.name}</p>
                                                    <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                                        <p>المقاس: {item.selectedSize}</p>
                                                        <p>الكمية: {item.quantity}</p>
                                                        <p>السعر: EGP {item.price * item.quantity}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-4 flex justify-between items-center border-t pt-3">
                                <span className="font-bold">الإجمالي: EGP {order.totalAmount}</span>
                                <button
                                    className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition ${isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    onClick={() => handleDeleteOrder(order.id)}
                                    disabled={isDeleting}
                                >
                                    {isDeleting ? 'جاري الحذف...' : 'حذف الطلب'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;