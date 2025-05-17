import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch("https://back-runzu-production.up.railway.app/products");
            if (!response.ok) {
                throw new Error("خطأ في جلب الطلبات");
            }
            const data = await response.json();
            return data;
        },
        refetchOnWindowFocus: false, // لمنع إعادة الجلب عند تركيز النافذة
        retry: 1 // عدد المحاولات عند الفشل
    });
}

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (ProID) => {
            const response = await fetch(`https://back-runzu-production.up.railway.app/products/${ProID}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("فشل في مسح المنتج");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']); // تحديث قائمة المنتجات بعد الحذف
        },
    });
}

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({formData, ProID}) => {
            const response = await fetch(`https://back-runzu-production.up.railway.app/products/update/${ProID}`, {
                method: "POST",
                body: formData,
            });
            if (!response.ok) {
                throw new Error("فشل في مسح المنتج");
            }
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']); // تحديث قائمة المنتجات بعد الحذف
        },
    })
}


export const useAddProducts = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch("https://back-runzu-production.up.railway.app/products", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("فشل في إضافة المنتج");
            }

            return response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']); // تحديث قائمة المنتجات
        },
    });
};
