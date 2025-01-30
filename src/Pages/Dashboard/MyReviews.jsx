import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const MyReviews = () => {
  const { user } = useAuth(); // Get the logged-in user's details
  const queryClient = useQueryClient(); // Query client for cache updates

  // Fetch reviews using TanStack Query
  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`, {
      });
      return data;
    },
  });
//   console.log(reviews)
  const reviewss = reviews.filter(review => review.
    reviewer_email === user?.email);
//  console.log(reviewss)
  // Mutation to delete a review
  const deleteMutation = useMutation({
    mutationFn: async (reviewId) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${reviewId}`);
    },
    onSuccess: () => {
      toast.success("Review deleted successfully!");
      queryClient.invalidateQueries(["reviews", user?.email]); // Refetch reviews after deletion
    },
    onError: () => {
      toast.error("Failed to delete the review.");
    },
  });

  // Handle loading and error states
  if (isLoading) return <LoadingSpinner />;
  if (error) {
    toast.error("Failed to fetch reviews!");
    return <p className="text-red-500 text-center">Failed to load reviews.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>

      {reviewss.length === 0 ? (
        <p className="">You have not left any reviews yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewss.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-md rounded-lg p-4 border flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.reviewer_image || "/default-avatar.png"}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h2 className="font-bold text-lg">{review.property_title || "Untitled Review"}</h2>
                  <p className="text-sm text-gray-500">
                    <strong>Agent:</strong> {review.agentName || "N/A"}
                  </p>
                </div>
              </div>

              <p className="text-gray-600 mb-2">Review: {review.reviewText || "No review text provided."}</p>
             
              <p className="text-sm text-gray-500 mb-4">
                <strong>Date:</strong>{" "}
                {new Date(review.date).toLocaleDateString() || "Unknown"}
              </p>

              <button
                onClick={() => deleteMutation.mutate(review._id)}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Delete Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;
