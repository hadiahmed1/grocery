import { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import axiosInstance from '../lib/axiosInstance';
import { useParams } from 'react-router-dom';

type ReviewFormData = {
    rating: number;
    review: string;
};

const ReviewForm = () => {
    const params = useParams();
    const { register, handleSubmit, formState: { errors } } = useForm<ReviewFormData>();

    const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
        try {
            await axiosInstance.post(`/review/${params.id}`, data);
            toast.success("Review submitted")
        } catch (error) {
            if (error instanceof AxiosError) toast.error(error.response?.data.message);
            else toast.error("Couldnt post review")
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-xl space-y-5 dark:bg-gray-800">
            {/* Rating */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Rating (0-5)</label>
                <input
                    type="range"
                    min="0"
                    max="5"
                    step="1"
                    {...register("rating", { min: 0, max: 5 })}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                {errors.rating && <p className="text-red-500 text-sm mt-1">Rating must be between 0 and 5</p>}
            </div>

            {/* Review */}
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Review</label>
                <input
                    type="text"
                    placeholder="Write your review"
                    {...register("review", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                {errors.review && <p className="text-red-500 text-sm mt-1">Review is required</p>}
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
                Submit Review
            </button>
        </form>
    );
};

export default ReviewForm;
