import axiosInstance from "../lib/axiosInstance";

const PayForOrderBtn = ({ id }: { id: string }) => {
  const makeOrder = async () => {
    try {
      const res = await axiosInstance.post(`/order/pay/${id}`);
      window.location.href = res.data.url; //to stripe
    } catch (err) {
      console.error("Error creating checkout session", err);
    }
  }
  return (<button
    className="w-16 m-2 bg-green-600 text-white py-1.5 px-4 rounded-lg font-medium
              hover:bg-blue-700 transform transition-all duration-300 hover:scale-[1.02]
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    onClick={() => makeOrder()}
  >
    Pay
  </button>)
}

export default PayForOrderBtn;