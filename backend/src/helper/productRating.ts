import { number } from "joi";
import Review from "../models/review.model"
function roundToDecimal(number: number, decimals: number) {
    const factor = Math.pow(10, decimals);
    return Math.round(number * factor) / factor;
}
const productRating = async (product_id: string) => {
    const rating_sum = await Review.sum('rating', { where: { product_id } });
    const count = await Review.count({ where: { product_id } });
    if (!count) return 1;
    return roundToDecimal(rating_sum / count, 2);
}

export default productRating;