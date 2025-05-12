import React, { useContext } from "react";
import { Context } from "../../context/cartContext";

const AdminOrders = () => {
  const { orders, removeOrder } = useContext(Context);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">قائمة الطلبات</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">لا توجد طلبات حالياً.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="bg-white shadow-md p-5 rounded-md">
              <h2 className="text-xl font-semibold mb-2">الطلب #{index + 1}</h2>
              <p><span className="font-medium">الاسم:</span> {order.customer.name}</p>
              <p><span className="font-medium">العنوان:</span> {order.customer.address}</p>
              <p><span className="font-medium">الهاتف:</span> {order.customer.phone}</p>
              <p><span className="font-medium">التاريخ:</span> {order.date}</p>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">المنتجات:</h3>
                <ul className="list-disc pl-5">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-4">
                      <img
                        src={item.Image} // عرض صورة المنتج
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p>{item.name} - الكمية: {item.quantity} - السعر: EGP {item.price * item.quantity}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 font-bold text-right">
                الإجمالي: EGP {order.totalAmount}
              </div>

              <button 
                className="bg-red-500 text-white cursor-pointer mt-4 px-4 py-2 rounded"
                onClick={() => removeOrder(index)}  // استدعاء الدالة لحذف الطلب
              >
                لو اتحضر شيلو من هنا
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
