import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ProductForm, { type ProductFormData } from './ProductForm';

const AddProductForm = () => {

    const addProduct = async (data: ProductFormData) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            if (value === undefined || value === null) return;

            if (key === "photo" && value instanceof FileList && value.length > 0) {
                formData.append("photo", value[0]);
            } else if (typeof value === "string") {
                formData.append(key, value);
            }
        });
        try {
            const res = await axios.post(
                "http://localhost:3000/product/",
                formData,
                {
                    withCredentials: true,
                    headers: { "Content-Type": "multipart/form-data" }
                }
            );
            toast.success(res.data?.data?.message || "Product added successfulyy");
        } catch (error) {
            if (error instanceof AxiosError) toast.error(error.response?.data.message);
            else toast.error("Couldn't add product")
        }
    };

    return (
        <ProductForm onSubmit={addProduct} />
    );
};

export default AddProductForm;
