


import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AllPropertyCard = ({ property }) => {
  const {
    _id,
    title,
    location,
    minPrice,
    maxPrice,
    image,
    agent,
    verification,
  } = property;

  return (
    <div className="col-span-1 shadow-lg p-4 rounded-xl group hover:shadow-2xl transition cursor-pointer">
      <div className="flex flex-col gap-4 w-full">
        {/* Image Section */}
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform"
          />
          {/* Optional Verification Badge */}
          {verification && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              Verified
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-xl truncate">{title}</h3>

        {/* Location */}
        <p className="text-gray-600 text-sm">
          <span className="font-semibold">Location:</span> {location}
        </p>

        {/* Price Range */}
        <p className="font-semibold text-lg text-gray-800">
          <span className="text-green-600">Price Range:</span> ${minPrice} - ${maxPrice}
        </p>

        {/* Agent Information */}
        <div className="flex items-center gap-3 mt-2">
          <img
            src={agent.image || 'https://via.placeholder.com/40'}
            alt={agent.name || 'Agent'}
            className="w-10 h-10 rounded-full border border-gray-300 object-cover"
          />
          <div className="text-sm">
            <p className="font-medium">{agent.name || 'Unknown Agent'}</p>
            {verification && <p className="text-blue-500 text-xs">Verified Agent</p>}
          </div>
        </div>

        {/* Details Button */}
        <Link to={`/property/${_id}`}>
          <button className="btn btn-primary w-full mt-4">View Details</button>
        </Link>
      </div>
    </div>
  );
};

AllPropertyCard.propTypes = {
  property: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    minPrice: PropTypes.number.isRequired,
    maxPrice: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    verification: PropTypes.bool,
    agent: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default AllPropertyCard;
