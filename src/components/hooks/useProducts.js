import { useQuery } from "@tanstack/react-query"

export const useGetProducts = ()=>{
return useQuery({
    queryKey:['products'],
    queryFn : async()=>{
        const response = await fetch("https://back-runzu-production.up.railway.app/products");
        if (!response.ok) {
            throw new Error("خطأ في جلب الطلبات");
        }
        const data = await response.json();
        console.log("✅ products fetched:", data);
        return data;
    },
    refetchOnWindowFocus: false, // لمنع إعادة الجلب عند تركيز النافذة
    retry: 1 // عدد المحاولات عند الفشل
});
};