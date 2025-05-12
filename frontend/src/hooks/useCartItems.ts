import { useEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

const useCartItem = () => {
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        const getItems = async () => {
            const res = await axiosInstance.get('cart/');
            setCartItems(res.data.data.cart);
        }
        getItems();
    });

    return cartItems;
}

export default useCartItem;