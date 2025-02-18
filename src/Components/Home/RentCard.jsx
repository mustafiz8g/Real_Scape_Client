import PropTypes from "prop-types";
import { FaBath, FaBed } from "react-icons/fa";
import { IoResizeOutline } from "react-icons/io5";
import { FiHeart, FiShare2 } from "react-icons/fi";

const Card = ({ propertyy }) => {
  const { _id, title, location, price, image, bedrooms, bathrooms, size, agent, isFeatured, isActive, isRental } = propertyy;

  return (
    <div className=" shadow-sm rounded-xl overflow-hidden transition hover:-translate-y-2 cursor-pointer">
      
      {/* Image Section */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-56 object-cover transition-transform hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          {isFeatured && <span className="bg-green-500  text-xs px-2 py-1 rounded">Featured</span>}
          {isRental && <span className="bg-blue-500  text-xs px-2 py-1 rounded">Rentals</span>}
          {isActive && <span className="bg-indigo-500  text-xs px-2 py-1 rounded">Active</span>}
        </div>

        {/* Video Count */}
        <div className="absolute top-2 right-2 bg-black/50  text-xs px-2 py-1 rounded">📹 6</div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Location */}
        <p className=" text-sm">📍 {location}</p>

        {/* Title */}
        <h3 className="font-semibold text-lg">{title}</h3>

        {/* Price */}
        <p className="text-blue-600 font-semibold text-lg">${price} <span className="text-sm ">/ month</span></p>

        {/* Short description */}
        <p className=" text-sm line-clamp-1">Sesame Street international co-productions are educational children’s television ser ...</p>

        {/* Property Details */}
        <div className="flex items-center gap-4  text-sm mt-2">
          <span className="flex items-center gap-1"><FaBed /> {bedrooms}</span>
          <span className="flex items-center gap-1"><FaBath /> {bathrooms}</span>
          <span className="flex items-center gap-1"><IoResizeOutline /> {size} ft²</span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t p-4 flex items-center justify-between">
        {/* Agent Info */}
        <div className="flex items-center gap-2">
          <img
            src={agent.image || "https://via.placeholder.com/40"}
            alt={agent.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm ">{agent.name}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 ">
          <FiHeart className="cursor-pointer hover:text-red-500" />
          <FiShare2 className="cursor-pointer hover:text-blue-500" />
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  propertyy: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    size: PropTypes.number.isRequired,
    agent: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired,
    isFeatured: PropTypes.bool,
    isActive: PropTypes.bool,
    isRental: PropTypes.bool,
  }).isRequired,
};

export default Card;
