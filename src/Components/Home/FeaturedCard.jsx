import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";
import { PiRuler } from "react-icons/pi";

const FeaturedCard = ({ propertyff }) => {
  const { _id, title, location, minPrice, image, beds, baths, area, agentImage } = propertyff;

  return (
    <div className="flex  bg-white shadow-md rounded-lg overflow-hidden max-w-xl">
      {/* Left: Image Section */}
      <div className="w-2/5 relative">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        <img src={agentImage} alt="Agent" className="w-10 h-10 rounded-full absolute bottom-2 left-2 border-2 border-white" />
      </div>

      {/* Right: Content Section */}
      <div className="w-3/5 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-blue-600 font-bold">${minPrice}</p>
          <p className="text-gray-600 text-sm mt-1">{location}</p>
        </div>

        {/* Property Details */}
        <div className="flex justify-between text-gray-500 text-sm mt-4">
          <div className="flex items-center gap-1">
            <FaBed /> {beds}
          </div>
          <div className="flex items-center gap-1">
            <FaBath /> {baths}
          </div>
          <div className="flex items-center gap-1">
            <PiRuler /> {area} ft²
          </div>
        </div>

        {/* Details Button */}
        <Link to={`/property/${_id}`} className="mt-4">
          <button className="w-full text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
};

FeaturedCard.propTypes = {
    propertyff: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    minPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    beds: PropTypes.number.isRequired,
    baths: PropTypes.number.isRequired,
    area: PropTypes.number.isRequired,
    agentImage: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedCard;
