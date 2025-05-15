import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ProductForm from './ProductForm';
import { useParams } from 'react-router-dom';
import { useSellerProducts } from '../hooks/useSellerProducts';
import type ProductAttributes from '../types/product.type';

const EditProductForm = () => {
    const prams = useParams();
    const productID = prams.id;
    const { products } = useSellerProducts();
    const product = products.find(product => product.id === productID) as ProductAttributes;
    const editProduct = async (
        data: { [x: string]: any; photo?: FileList },
        product: ProductAttributes
    ) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === "photo") {
                if (data.photo && data.photo.length > 0) {
                    formData.append("photo", data.photo[0]); // only if new file selected
                }
            } else {
                const newValue = String(data[key]);
                const isChanged = product
                    ? key in product && newValue !== String((product as any)[key] ?? "")
                    : true;

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
