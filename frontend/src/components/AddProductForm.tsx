import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import ProductForm from './ProductForm';

const AddProductForm = () => {

    const addProduct = async (data: { [x: string]: string | Blob; photo?: any; }) => {
        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (key === "photo") {
                formData.append("photo", data.photo[0]);
            } else {
                formData.append(key, data[key]);
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
