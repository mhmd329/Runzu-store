import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
export const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
      mutationFn: async (orderId) => {
        const response = await fetch(`http://localhost:3001/orders/${orderId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("خطأ في حذف الطلب");
        }
        return response.json();
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['orders']);
      },
      onError: (error) => {
        console.error("حدث خطأ أثناء حذف الطلب:", error.message);
      },
    });
  };


export const useCreateOrder = () => {
    return useMutation({
        mutationFn: async (orderData) => {
            console.log("🔄 Sending order:", orderData);
            console.log("Order data structure is valid:", orderData.customer && orderData.items.length > 0 && orderData.totalAmount > 0);

            const response = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            if (!response.ok) {
                console.error("❌ Response failed:", response); // طباعة حالة الاستجابة
                throw new Error("خطأ في إرسال الطلب");
            }

            const data = await response.json();
            console.log("✅ Order saved:", data); // طباعة الرد من السيرفر
            return data;
        },
        onSuccess: (data) => {
            console.log("تم الطلب بنجاح:", data);
        },
        onError: (error) => {
            console.error("حدث خطأ أثناء إرسال الطلب:", error.message);
        },
    });
};


export const useGetOrders = () => {
    return useQuery({
        queryKey: ['orders'], // مفتاح فريد للاستعلام
        queryFn: async () => {
            const response = await fetch("http://localhost:3001/orders");

            if (!response.ok) {
                throw new Error("خطأ في جلب الطلبات");
            }

            const data = await response.json();
            console.log("✅ Orders fetched:", data);
            return data;
        },
        refetchOnWindowFocus: false, // لمنع إعادة الجلب عند تركيز النافذة
        retry: 1 // عدد المحاولات عند الفشل
    });
};