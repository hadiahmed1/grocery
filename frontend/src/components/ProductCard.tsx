import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import type ProductAttributes from "../types/product.type";
import AddToCartBtn from "./AddToCartBtn";
import DeleteFromCartBtn from "./DeleteFromCartBtn";
import BuyProductButton from "./BuyProductButton";

const ProductCard = ({ product, cartItemId = undefined }: { product: ProductAttributes, cartItemId?: string | undefined }) => {
    const [quantity, setQuantity] = useState(product.count ?? 1);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const incrementQuantity = () => setQuantity((prev) => prev + 1);
    const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const toggleDescription = () => setShowFullDescription(!showFullDescription);

    const discountedPrice = (
        product.mrp -
        (product.mrp * (product.discount_percent || 0)) / 100
    ).toFixed(2);

    return (
        <div className="max-w-4xl w-full mx-auto p-4">
            <div className="bg-gray-900 text-white rounded-2xl shadow-lg overflow-hidden">
                <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-1/2 relative overflow-hidden group">
                        <img
                            src={
                                product.photo ||
                                "https://images.unsplash.com/photo-1590634332991-a336e1996brk?placeholder"
                            }
                            alt={product.name}
                            className="w-full h-[400px] object-cover transform transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                        />
                    </div>

                    {/* Product Details Section */}
                    <div className="md:w-1/2 p-6 space-y-4">
                        <div className="flex justify-between items-start">
                            <h1 className="text-2xl font-bold text-white truncate">
                                {product.name} <span className="text-xl text-gray-400 font-light">{(product.quantity || 1) + " " + (product.unit || "")}</span>
                            </h1>
                        </div>
                        {/* Toggle Description */}
                        <div className="space-y-2">
                            <p className="text-gray-300">
                                {showFullDescription
                                    ? product.description
                                    : `${(product.description || "").slice(0, 100)}...`}
                                <button
                                    onClick={toggleDescription}
                                    className="text-blue-400 hover:text-blue-300 ml-1 font-medium"
                                >
                                    {showFullDescription ? "Read Less" : "Read More"}
                                </button>
                            </p>
                        </div>
                        {/* Price */}
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-3xl font-bold text-green-400">
                                    ₹{discountedPrice}
                                </span>
                                <span className="text-lg text-gray-400 line-through">
                                    ₹{product.mrp}
                                </span>
                                <span className="bg-green-800 text-green-100 text-sm font-medium px-2.5 py-0.5 rounded">
                                    {product.discount_percent}% OFF
                                </span>
                            </div>
                        </div>
                        {/*Product Quantity  */}
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center border border-gray-700 rounded-lg">
                                <button
                                    onClick={decrementQuantity}
                                    className="p-2 hover:bg-gray-800 transition-colors"
                                    aria-label="Decrease quantity"
                                >
                                    <FaMinus />
                                </button>
                                <span className="px-4 py-2 font-medium">{quantity}</span>
                                <button
                                    onClick={incrementQuantity}
                                    className="p-2 hover:bg-gray-800 transition-colors"
                                    aria-label="Increase quantity"
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>

                        {!cartItemId && <AddToCartBtn id={product.id} quantity={quantity} />}
                        {!cartItemId && <BuyProductButton id={product.id} quantity={quantity} />}
                        {cartItemId && <DeleteFromCartBtn id={cartItemId} />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
