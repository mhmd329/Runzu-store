import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const BASE_URL = import.meta.env.MODE === 'production'
  ? import.meta.env.VITE_BASE_URL_PROD
  : import.meta.env.VITE_BASE_URL_TEST;

export const useGetProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await fetch(`${BASE_URL}/products`);
            if (!response.ok) {
                throw new Error("خطأ في جلب الطلبات");
            }
            return await response.json();
        },
        refetchOnWindowFocus: false,
        retry: 1
    });
};

export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (productId) => {
            const response = await fetch(`${BASE_URL}/products/${productId}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("فشل في مسح المنتج");
            }

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

export const useUpdateProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ formData, ProID }) => {
            const response = await fetch(`${BASE_URL}/products/update/${ProID}`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("فشل في تعديل المنتج");
            }

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};

export const useAddProducts = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (formData) => {
            const response = await fetch(`${BASE_URL}/products`, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("فشل في إضافة المنتج");
            }

            return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        },
    });
};
