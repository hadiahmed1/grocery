import { useForm } from 'react-hook-form';
import useAddress from '../hooks/useAddress';
import type ProductAttributes from '../types/product.type';
const inputstyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

type ProductFormProps = {
    onSubmit: (data: {
        [x: string]: string | Blob;
        photo?: any;
    }) => Promise<void>;
    product?: ProductAttributes;
}

const ProductForm = ({ onSubmit, product }: ProductFormProps) => {
    const addresses = useAddress();
    const { register, handleSubmit, formState: { errors } } = useForm();
    return (
        <div className="flex flex-col items-center">
            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit(onSubmit)}>
                {/* NAME */}
                <div className="mb-5">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                    <input {...register("name", { required: !product })}
                        type="text" id="name"
                        className={inputstyle}
                        placeholder="Product name" />
                    {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
                </div>

                {/* MRP */}
                <div className="mb-5">
                    <label htmlFor="mrp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">MRP</label>
                    <input {...register("mrp", { required: !product, min: 1, max: 99999999 })}
                        type="number" id="mrp"
                        className={inputstyle}
                        placeholder="Maximum retail price" />
                    {errors.mrp && <span className="text-red-500 text-sm">Valid MRP is required</span>}
                </div>

                {/* DESCRIPTION */}
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input {...register("description", { max: 250 })}
                        type="text" id="description"
                        className={inputstyle}
                        placeholder="Product description" />
                    {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
                </div>

                {/* DISCOUNT */}
                <div className="mb-5">
                    <label htmlFor="discount_percent" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount (%)</label>
                    <input {...register("discount_percent", { min: 0, max: 100 })}
                        defaultValue={product?.name}
                        type="number" id="discount_percent"
                        className={inputstyle}
                        placeholder="0 - 100%" />
                    {errors.discount_percent && <span className="text-red-500 text-sm">Enter valid discount</span>}
                </div>

                {/* QUANTITY */}
                <div className="mb-5">
                    <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</label>
                    <input {...register("quantity", { min: 1 })}
                        defaultValue={product?.quantity}
                        type="number" id="quantity"
                        className={inputstyle}
                        placeholder="Quantity available" />
                </div>

                {/* UNIT */}
                <div className="mb-5">
                    <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>
                    <select {...register("unit")} id="unit" defaultValue={product?.unit}
                        className={inputstyle}>
                        <option value="piece">Piece</option>
                        <option value="units">Units</option>
                        <option value="kg">Kg</option>
                        <option value="g">g</option>
                        <option value="mg">mg</option>
                        <option value="lb">lb</option>
                        <option value="ml">ml</option>
                        <option value="l">l</option>
                    </select>
                </div>

                {/* STOCK */}
                <div className="mb-5">
                    <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                    <input {...register("stock", { min: 1 })}
                        defaultValue={product?.stock}
                        type="number" id="stock"
                        className={inputstyle}
                        placeholder="Stock count" />
                </div>

                {/* ADDRESS ID */}
                <div className="mb-5">
                    <label htmlFor="address_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address ID</label>
                    <select {...register("address_id")} id="address_id"
                        className={inputstyle}>
                        {addresses.map(address => <option value={address.id}>{address.name}</option>)}
                    </select>
                </div>

                {/* PHOTO UPLOAD */}
                <div className="mb-5">
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Product Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="photo"
                        {...register("photo", { required: !product })}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer 
                        bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 
                        dark:placeholder-gray-400"
                    />
                    {errors.photo && <span className="text-red-500 text-sm">Photo is required</span>}
                </div>

                {/* SUBMIT */}
                <button type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto 
                    px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default ProductForm;
