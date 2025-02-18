import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Container from "../Shared/Container";
import LoadingSpinner from "../Shared/LoadingSpinner";
import TitleSubTitle from "../TitleSubTitle";

const Review = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/reviews`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Section Title */}
      <TitleSubTitle
        title="Latest User Reviews"
        subTitle="Hear from our community! Check out the most recent reviews shared by our trusted users."
      />

      {reviews && reviews.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review._id} className=" shadow-sm rounded-xl p-6 space-y-3 text-center">
              
              {/* Profile Image & Info */}
              <div className="flex flex-col items-center">
                <img
                  src={review.reviewer_image || "https://via.placeholder.com/50"}
                  alt={review.reviewer_name || "Reviewer"}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                <h3 className="text-lg font-semibold mt-2">{review.reviewer_name || "Anonymous"}</h3>
                <p className="text-sm text-gray-500">{review.role || "Happy Customer"}</p>
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm">{review.reviewText}</p>

              {/* Star Rating */}
              <div className="text-yellow-500 text-lg">⭐⭐⭐⭐⭐</div>

            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold">No Reviews Found</h1>
      )}
    </Container>
  );
};

export default Review;
