import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Container from "../Components/Shared/Container";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const PropertyDetails = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: property = {}, isLoading, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/property/${id}`
      );
      return data;
    },
  });

  // State for review input
  const [review, setReview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  const { title, location, minPrice, maxPrice, image, description, verification, agent } = property;

  // Add to wishlist functionality
  const handleAddToWishlist = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/wishlists`, {
        image,
        title,
        location,
        agent,
        verification,
        price: { minPrice, maxPrice },
      });
      toast.success("Added to wishlist successfully!");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add to wishlist. Please try again.");
    }
  };

  // Submit review functionality
  const handleReviewSubmit = async () => {
    if (!review.trim()) {
      toast.error("Review cannot be empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/reviews`, {
        property_title: title,
        reviewer_name: user?.displayName,
        reviewer_image: user?.photoURL,
        reviewText: review,
        reviewer_email: user?.email,
        review_date: new Date().toISOString(), // Include review date
      });

      console.log("Review submitted:", response.data);
      toast.success("Review submitted successfully!");
      setReview(""); 
      refetch(); // Refresh data after submission
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your review here..."
            className="w-full h-32 p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          ></textarea>
          <button
            onClick={handleReviewSubmit}
            className="px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 transition"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PropertyDetails;
