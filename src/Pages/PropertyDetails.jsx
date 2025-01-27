


import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../Components/Shared/Container";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";

const PropertyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/property/${id}`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { title, location, minPrice, maxPrice, image, description } = property;

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", id);
    // Implement add-to-wishlist functionality here
  };

  const handleAddReview = () => {
    console.log("Opening review modal...");
    // Implement add-review functionality or modal here
  };

  return (
    <Container>
      <Helmet>
        <title>Property Details - {title || "Loading..."}</title>
      </Helmet>
      <div className="py-8">
        {/* Image and Title */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Property Image */}
          <div className="flex-1">
            <img
              src={image || "https://via.placeholder.com/800x600"}
              alt={title || "Property"}
              className="w-full h-72 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
          {/* Property Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800">
              {title || "Property Title"}
            </h1>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Location: </span>
              {location || "Unknown"}
            </p>
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Price Range: </span>
              ${minPrice?.toLocaleString()} - ${maxPrice?.toLocaleString()}
            </p>
            <p className="text-gray-700">
              {description || "No description available for this property."}
            </p>

            {/* Add to Wishlist Button */}
            <button
              onClick={handleAddToWishlist}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition"
            >
              Add to Wishlist
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-300"></div>

        {/* Add Review Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add a Review</h2>
          <textarea
            placeholder="Write your review here..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            onClick={handleAddReview}
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PropertyDetails;
