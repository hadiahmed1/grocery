import axiosInstance from "../lib/axiosInstance";

const useAddToCart = async (product_id: string, count: number = 1) => {
    try {
        const { data } = await axiosInstance.post('cart/', { product_id, count });
        console.log(data)
        return data.data.success;
    } catch (error) {
        return false;
    }
}

export default useAddToCart;