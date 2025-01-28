import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";

const Offer = () => {
  const { user } = useAuth(); // Get authenticated user details
  const { id } = useParams(); // Get the property ID from the URL
  const { data: offer = {}, isLoading, refetch } = useQuery({
    queryKey: ["offer", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/offer/${id}`
      );
      return data;
    },
  });

  // Form state
  const [formData, setFormData] = useState({
    amount: "",
    buyingDate: new Date().toISOString().split("T")[0], // Default to today's date
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { image, location, agent, price, title, verification } = offer;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for offer amount
    const offerAmount = parseFloat(formData.amount);
    if (!offerAmount) {
      toast.error("Please enter a valid offer amount!");
      return;
    }

    if (price && (offerAmount < price.minPrice || offerAmount > price.maxPrice)) {
      toast.error(
        `Offer amount must be between $${price.minPrice} and $${price.maxPrice}!`
      );
      return;
    }

    try {
      // Post the data to the database
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/offers`, {
        propertyId: id,
        title,
        agentName: agent.name,

        userId: user?.id, // Assuming `user.id` is available
        amount: formData.amount,
        buyingDate: formData.buyingDate,
        userName: user?.displayName,

        userEmail: user?.email,
        boughtStatus: "pending",
      });

      toast.success("Offer submitted successfully!");
    } catch (error) {
      toast.error(error.response?.data || "Failed to submit the offer!");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property Details */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <img src={image} alt={title} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-600">
            <strong>Location:</strong> {location}
          </p>
          <p className="text-gray-600">
            <strong>Price:</strong> ${price?.minPrice} - ${price?.maxPrice}
          </p>
          <p className="text-gray-600">
            <strong>Agent:</strong> {agent?.name || "N/A"}
          </p>
          <p
            className={`font-semibold ${
              verification ? "text-green-600" : "text-red-600"
            }`}
          >
            {verification ? "Verified Property" : "Unverified Property"}
          </p>
        </div>
      </div>

      {/* Offer Form */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold mb-4">Make an Offer</h3>
        <form onSubmit={handleSubmit}>
          {/* Amount Input */}
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-gray-700 font-medium mb-2"
            >
              Offer Amount ($)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your offer amount"
              required
            />
          </div>

          {/* Buying Date Input */}
          <div className="mb-4">
            <label
              htmlFor="buyingDate"
              className="block text-gray-700 font-medium mb-2"
            >
              Buying Date
            </label>
            <input
              type="date"
              id="buyingDate"
              name="buyingDate"
              value={formData.buyingDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Submit Offer
          </button>
        </form>
      </div>
    </div>
  );
};

export default Offer;
