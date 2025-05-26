import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ProductForm, { type ProductFormData } from './ProductForm';
import { useParams } from 'react-router-dom';
import { useSellerProducts } from '../hooks/useSellerProducts';
import type ProductAttributes from '../types/product.type';

const EditProductForm = () => {
    const prams = useParams();
    const productID = prams.id;
    const { products } = useSellerProducts();
    const product = products.find(product => product.id === productID) as ProductAttributes;
    const editProduct = async (
        data: ProductFormData,
        product: ProductAttributes
    ) => {
        const formData = new FormData();
        //creating form data
        Object.entries(data).forEach(([key, value]) => {
            if (key === "photo") {
                if (value instanceof FileList && value.length > 0) {
                    formData.append("photo", value[0]);
                }
            } else if (typeof value !== "undefined") {
                const newValue = String(value);
                const oldValue = product ? String((product as prod)[key] ?? "") : "";

                const isChanged = product ? newValue !== oldValue : true;

                if (newValue && isChanged) {
                    formData.append(key, newValue);
                }
            }
        });


        try {
            const res = await axios.patch(
                "http://localhost:3000/product/" + productID,
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );

            toast.success(res.data?.data?.message || `Product ${product ? "updated" : "added"} successfully`);
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data.message);
            } else {
                toast.error(`Couldn't ${product ? "update" : "add"} product`);
            }
        }
    };


    return (
        <ProductForm onSubmit={(data) => editProduct(data, product)} product={product} />
    );
};

export default EditProductForm;
