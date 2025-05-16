import Review from "../models/review.model"

const productRating = async (product_id: string) => {
    const rating_sum = await Review.sum('rating', { where: { product_id } });
    const count = await Review.count({ where: { product_id } });
    return (rating_sum / count).toFixed(1);
}

export default productRating;