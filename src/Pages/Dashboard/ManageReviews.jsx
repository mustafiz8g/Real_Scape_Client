// ManageReviews.jsx (Frontend)
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from '../../Components/Shared/Container';

const ManageReviews = () => {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch reviews from the backend
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/reviews`);
                setReviews(response.data);
                setIsLoading(false);
            } catch (error) {
                toast.error('Error fetching reviews');
                setIsLoading(false);
            }
        };
        fetchReviews();
    }, []);

    // Handle deleting a review
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/reviews/${id}`);
            // Remove the deleted review from the state
            setReviews(reviews.filter(review => review._id !== id));
            toast.success('Review deleted successfully');
        } catch (error) {
            toast.error('Error deleting review');
        }
    };

    if (isLoading) return <div>Loading...</div>;

    return (
      <Container>
          <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">Manage Reviews</h2>
            <div className="space-y-4">
                {reviews.length === 0 ? (
                    <p>No reviews available</p>
                ) : (
                    reviews.map((review) => (
                        <div
                            key={review._id}
                            className="p-4 border border-gray-200 rounded-lg shadow-lg flex items-center space-x-4"
                        >
                            <img
                                src={review.reviewer_image || 'default-avatar.png'}
                                alt="Reviewer"
                                className="w-12 h-12 rounded-full"
                            />
                            <div className="flex-1">
                                <div className="font-semibold">{review.reviewer_name || 'Anonymous'}</div>
                                <div className="text-sm text-gray-500">{review.reviewer_email}</div>
                                <p className="mt-2">{review.reviewText}</p>
                                <div className="text-sm text-gray-400 mt-2">
                                    {new Date(review.review_date).toLocaleString()}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(review._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                            >
                                Delete Review
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
      </Container>
    );
};

export default ManageReviews;
