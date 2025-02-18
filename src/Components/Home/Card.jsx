import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Card = ({ property }) => {
  const { _id, title, location, minPrice, maxPrice, image, verification } = property;

  return (
    <div className="col-span-1 shadow-xl p-3 rounded-xl group cursor-pointer flex flex-col h-full transition transform hover:-translate-y-2 ">
      <div className="flex flex-col gap-2 w-full flex-grow">
        {/* Image */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 transition"
          />
        </div>

        {/* Title */}
        <div className="font-semibold text-lg bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          {title}{" "}
          <span className="badge badge-sm ">{verification}</span>
        </div>

        {/* Location */}
        <div className="text-[#6B7280] font-medium">📍 {location}</div>

        {/* Price Range */}
        <div className="font-semibold text-[#4A5568] text-lg">
          💰 Price Range: <span className="text-green-600">${minPrice} - ${maxPrice}</span>
        </div>
      </div>

      {/* Button: Always at Bottom */}
      <Link to={`/property/${_id}`} className="mt-auto">
        <button className="w-full text-white bg-[#578FCA] hover:bg-[#4a7cb4] px-4 py-2 rounded-lg transition">
          Details
        </button>
      </Link>
    </div>
  );
};

Card.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    verification: PropTypes.string,
  }).isRequired,
};

export default Card;
