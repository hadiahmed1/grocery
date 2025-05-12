import type ProductAttributes from "../types/product.type";

import { Link } from "react-router-dom";
const ProductCard = ({ product }: { product: ProductAttributes }) => {
    return (
        <Link to={``}>
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                <img className="p-8 rounded-t-lg object-cover max-h-96" src={product.photo || ""} alt="product image" />
                <div className="px-5 pb-5">
                    <a href="#">
                        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    </a>

                    <div className="flex items-center justify-between my-3">
                        <span className="text-3xl font-light text-gray-600 dark:text-white line-through"><span>&#8377;</span>{product.mrp}</span>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white"><span>&#8377;</span>{(product.mrp * (product.discount_percent || 0) / 100).toFixed(2)}</span>
                    </div>
                    <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                </div>
            </div>
        </Link>

    )
};

export default ProductCard; 