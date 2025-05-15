import { AxiosError } from "axios";
import { useEffect, useState } from "react"
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";

type Addresses = {
    id: string;
    name: string;
    pincode: string;
}

const useAddress = () => {
    const fetchAddress = () => {
        axiosInstance.get('address/').then(res => setAddresses(res.data.data.addresses))
            .catch(error => {
                if (error instanceof AxiosError) toast.error(error.response?.data.message);
                else toast.error("Couldn't fetch Addresses");
            })
    }
    const [addresses, setAddresses] = useState<Addresses[]>([]);
    useEffect(() => {
        fetchAddress()
    }, [])

    return addresses;
}

export default useAddress;