// src/hooks/useOrders.js
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// تحديد رابط الـ API حسب البيئة
const BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL_TEST;

// جلب جميع الطلبات
export const useGetOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      try {
        const response = await fetch(`${BASE_URL}/orders`);
        
        if (!response.ok) {
          const errorData = await response.json(); // حاول قراءة رسالة الخطأ من الخادم
          throw new Error(errorData.message || "خطأ في جلب الطلبات");
        }
        
        return await response.json();
      } catch (error) {
        console.error('Fetch error:', error);
        throw new Error(error.message || "حدث خطأ أثناء الاتصال بالخادم");
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });
};

// إنشاء طلب جديد
export const useCreateOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        console.error("❌ Response failed:", response);
        throw new Error("خطأ في إرسال الطلب");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      console.log("✅ تم الطلب بنجاح:", data);
    },
    onError: (error) => {
      console.error("❌ حدث خطأ أثناء إرسال الطلب:", error.message);
    },
  });
};

// حذف طلب
export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderId) => {
      const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("خطأ في حذف الطلب");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['orders']);
    },
    onError: (error) => {
      console.error("❌ حدث خطأ أثناء حذف الطلب:", error.message);
    },
  });
};
