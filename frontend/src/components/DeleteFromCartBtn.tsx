import useCartItem from "../hooks/useCartItems"

const DeleteFromCartBtn = ({ id }: { id: string }) => {
    const { deleteItem } = useCartItem();
    return (
        <button //Remove from cart
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-medium
              hover:bg-red-700 transform transition-all duration-300 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={() => deleteItem(id)}
        >
            Remove from Cart
        </button>
    )
}

export default DeleteFromCartBtn;