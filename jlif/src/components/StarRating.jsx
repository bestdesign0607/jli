import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export const StarRating = ({ rating = 0, size = "text-sm" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FaStar key={i} className={`text-yellow-400 ${size}`} />);
    } else if (i - rating < 1) {
      stars.push(<FaStarHalfAlt key={i} className={`text-yellow-400 ${size}`} />);
    } else {
      stars.push(<FaRegStar key={i} className={`text-gray-300 ${size}`} />);
    }
  }

  return <div className="flex gap-0.5">{stars}</div>;
};
