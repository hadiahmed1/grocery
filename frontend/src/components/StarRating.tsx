import { Star, StarHalf, Star as StarOutline } from 'lucide-react';

interface StarRatingProps {
    rating: number; // rating from 1 to 5, can be decimal like 3.5
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            stars.push(<Star key={i} className="text-yellow-400 w-5 h-5 fill-yellow-400" />);
        } else if (rating >= i - 0.5) {
            stars.push(<StarHalf key={i} className="text-yellow-400 w-5 h-5 fill-yellow-400" />);
        } else {
            stars.push(<StarOutline key={i} className="text-gray-300 w-5 h-5" />);
        }
    }

    return <div className="flex">{stars}</div>;
};

export default StarRating;
