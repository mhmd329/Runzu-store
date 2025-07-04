import React from "react";
import { useDeleteOrder, useGetOrders } from '../hooks/useCreateOrder';
import { toast } from 'react-toastify';

const AdminOrders = () => {
    const { data: orders, isLoading, isError, error } = useGetOrders();
    const { mutate: deleteOrder, isLoading: isDeleting } = useDeleteOrder();
    const handleDeleteOrder = (orderId) => {
        if (window.confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
            deleteOrder(orderId, {
                onSuccess: () => toast.success('تم حذف الطلب بنجاح ✅'),
                onError: () => toast.error('فشل في حذف الطلب')
            });
        }
    };

    if (isLoading) return <div className="text-center py-8">جاري تحميل الطلبات...</div>;
    if (isError) return <div className="text-center py-8 text-red-500">خطأ في تحميل الطلبات: {error.message}</div>;
const BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL_TEST;
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {orders?.length === 0 ? (
                <p className="text-center text-gray-500">لا توجد طلبات حالياً.</p>
            ) : (
                <div className="space-y-6">
                    {orders?.map((order) => {
                        // تحويل التاريخ إذا كان نصاً
                        const orderDate = typeof order.date === 'string' 
                            ? order.date 
                            : order.date?.toLocaleDateString('ar-EG') || 'تاريخ غير معروف';
                        
                        return (
                            <div key={order._id} className="bg-white shadow-md p-5 rounded-md">
                                <div className="flex justify-between items-start">
                                    <h2 className="text-xl font-semibold mb-2">الطلب #{order._id?.substring(0, 8) || 'N/A'}</h2>
                                    <span className="text-sm text-gray-500">
                                        {orderDate}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                                    <div className="border p-3 rounded">
                                        <h3 className="font-medium border-b pb-1">معلومات العميل</h3>
                                        <p className="mt-2">
                                            <span className="font-medium">الاسم:</span> {order.customer?.name || 'غير متوفر'}
                                        </p>
                                        <p>
                                            <span className="font-medium">العنوان:</span> {order.customer?.address || 'غير متوفر'}
                                        </p>
                                        <p>
                                            <span className="font-medium">الهاتف:</span> {order.customer?.phone || 'غير متوفر'}
                                        </p>
                                        <p>
                                            <span className="font-medium">الحالة:</span> {order.status === 'pending' ? 'قيد الانتظار' : 'مكتمل'}
                                        </p>
                                    </div>

                                    <div className="md:col-span-2">
                                        <h3 className="font-medium border-b pb-1">المنتجات</h3>
                                        {order.items?.length > 0 ? (
                                            <ul className="divide-y">
                                                {order.items.map((item, i) => (
                                                    <li key={i} className="py-3 flex items-start gap-4">
                                                        <div className="flex-1">
                                                            {item.Image && (
                                                                <img
                                                                    loading="lazy"
                                                                    src={`${BASE_URL}${item.Image}`}
                                                                    alt={item.name || 'صورة المنتج'}
                                                                    className="w-16 h-16 rounded-md object-cover"
                                                                    onError={(e) => {
                                                                        e.target.src = 'https://via.placeholder.com/80';
                                                                    }}
                                                                />
                                                            )}
                                                            <p className="font-medium">{item.name || 'منتج غير معروف'}</p>
                                                            <div className="flex gap-4 text-sm text-gray-600 mt-1">
                                                                {item.selectedSize && <p>المقاس: {item.selectedSize}</p>}
                                                                <p>الكمية: {item.quantity || 0}</p>
                                                                <p>السعر: EGP {(item.price || 0) * (item.quantity || 0)}</p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-gray-500">لا توجد منتجات في هذا الطلب</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-between items-center border-t pt-3">
                                    <div>
                                        <span className="font-bold">الإجمالي: EGP {order.totalAmount?.toFixed(2) || '0.00'}</span>
                                    </div>
                                    <button
                                        className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition ${
                                            isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        onClick={() => handleDeleteOrder(order._id)}
                                        disabled={isDeleting || !order._id}
                                    >
                                        {isDeleting ? 'جاري الحذف...' : 'حذف الطلب'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminOrders;