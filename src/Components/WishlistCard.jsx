import useRole from "../hooks/useRole";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const WishlistCard = ({ wishlist, onRemove }) => {
    const [role] = useRole();
    const { _id, image, title, location, agent, price, verification } = wishlist;
  
    // Delete wishlist item function
    const deleteWishlistItem = async () => {
        onRemove(_id);
    };

    return (
        <div className="relative bg-gradient-to-b  shadow-xl rounded-2xl overflow-hidden group transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 ">
            {/* Image Section */}
            <div className="relative">
                <img
                    src={image}
                    alt={title}
                    className="h-48 w-full object-cover rounded-t-2xl"
                />
                {/* Floating Price Tag */}
                <div className="absolute top-4 left-4 bg-green-500  text-sm font-semibold px-3 py-1 rounded-md shadow-md">
                    ${price.minPrice} - ${price.maxPrice}
                </div>
            </div>

            {/* Details Section */}
            <div className="p-6 space-y-4">
                {/* Title */}
                <h3 className="text-xl font-bold  group-hover:text-green-600 transition">
                    {title}
                    <span className="text-blue-600 badge">{verification}</span>
                </h3>

                {/* Location */}
                <p className=" text-sm">
                    <span className="font-medium">Location:</span> {location}
                </p>

                {/* Agent Info */}
                <div className="flex items-center gap-3">
                    <img
                        src={agent?.image || "https://via.placeholder.com/40"}
                        alt={agent?.name || "Agent"}
                        className="w-10 h-10 rounded-full border  object-cover"
                    />
                    <div>
                        <p className="font-medium ">{agent?.name || "Agent"}</p>
                        <p className="text-xs ">Trusted Agent</p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-1.5">
                    {/* Make an Offer Button */}
                    {role === 'admin' || role === 'agent' ? (
                        <p className="text-red-500 font-semibold">Admins and Agents are not allowed to buy.</p>
                    ) : (
                        <Link to={`/offer/${_id}`}>
                            <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                                Make an Offer
                            </button>
                        </Link>
                    )}
                    
                    {/* Remove Button */}
                    <button
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                        onClick={deleteWishlistItem}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

WishlistCard.propTypes = {
    wishlist: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        agent: PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
        }).isRequired,
        verification: PropTypes.string.isRequired,
        price: PropTypes.shape({
            minPrice: PropTypes.number.isRequired,
            maxPrice: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onRemove: PropTypes.func.isRequired, // Callback function for removing item from list
    refetch: PropTypes.func.isRequired, // Callback function to refetch data
};

export default WishlistCard;
