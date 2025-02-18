


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

        <TitleSubTitle title="Latest User Reviews" subTitle="Hear from our community! Check out the most recent reviews on properties, shared by our trusted users.
        "></TitleSubTitle>
      {reviews && reviews.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {reviews.map((review) => (
            <div
              key={review._id}
              className=" shadow-lg rounded-xl p-4 space-y-4"
            >
              {/* Reviewer Image */}
              <div className="flex items-center gap-4">
                <img
                  src={review.reviewer_image || "https://via.placeholder.com/50"}
                  alt={review.reviewer_name || "Reviewer"}
                  className="w-12 h-12 rounded-full object-cover border border-base-100"
                />
                <div>
                  <h3 className="text-lg font-semibold ">
                    {review.reviewer_name || "Anonymous"}
                  </h3>
                  <p className="text-sm ">
                    {review.property_title || "Untitled Property"}
                  </p>
                </div>
              </div>

              {/* Review Text */}
              <p className=" text-sm">{review.reviewText}</p>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-xl font-semibold ">
          No Reviews Found
        </h1>
      )}
    </Container>
  );
};

export default Review;
