

const Card = ({ property }) => {
    const { title, location, minPrice, maxPrice, image } = property;
  
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
          <div className="font-semibold text-lg">{title}</div>
          {/* Location */}
          <div className="text-gray-600">Location: {location}</div>
          {/* Price Range */}
          <div className="font-semibold text-lg">
            Price Range: ${minPrice} - ${maxPrice}
          </div>
        </div>
      </div>
    );
  };
  
  export default Card;