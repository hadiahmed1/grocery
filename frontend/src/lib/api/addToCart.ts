import axiosInstance from "../axiosInstance"

const addToCart = async (product_id: string, count: number = 1) => {
    try {
        const { data } = await axiosInstance.post('cart/', { product_id, count });
        return data.data.success;
    } catch (error) {
        return false;
    }
}

export default addToCart;