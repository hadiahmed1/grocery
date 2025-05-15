import { useNavigate } from "react-router-dom";

const EditProductBtn = ({ id }: { id: string }) => {
    const navigate = useNavigate();
    return (<button onClick={() => navigate(id)}>Edit Product</button>)
};

export default EditProductBtn;