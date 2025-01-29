

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Card = ({ property }) => {
    const {_id, title, location, minPrice, maxPrice, image,verification } = property;
  
    return (
      <div className="col-span-1 shadow-xl p-3 rounded-xl group cursor-pointer">
        <div className="flex flex-col gap-2 w-full">
          {/* Image */}
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <img
              src={image}
              alt={title}
              className="object-cover w-full h-full group-hover:scale-110 transition"
            />
          </div>
          {/* Title */}
          <div className="font-semibold text-lg">{title}
           <div className="badge badge-sm badge-secondary">{verification}</div>
          </div>
          {/* Location */}
          <div className="text-gray-600">Location: {location}</div>
          {/* Price Range */}
          <div className="font-semibold text-lg">
            Price Range: ${minPrice} - ${maxPrice}
          </div>
            <Link to={`/property/${_id}`}><button className='btn w-full'>Details</button></Link>
        </div>
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
  }).isRequired,
  
}
  
  export default Card;