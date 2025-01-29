import { useEffect, useState } from "react";
import axios from "axios";

const PropertyBought = () => {
  const [offers, setOffers] = useState([]);
  const userEmail = "juwel@gmail.com"; // Replace with authenticated user email

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/offers`, { params: { userEmail } })
      .then(response => setOffers(response.data))
      .catch(error => console.error("Error fetching offers:", error));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Properties You Offered</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div key={offer._id} className="p-4 border rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">{offer.title}</h3>
            <p className="text-gray-600">Agent: {offer.agentName}</p>
            <p className="text-gray-600">Offered Amount: ${offer.amount}</p>
            <p className={`font-semibold ${offer.boughtStatus === "accepted" ? "text-green-500" : "text-yellow-500"}`}>
              Status: {offer.boughtStatus}
            </p>
            {offer.boughtStatus === "accepted" && (
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md">Pay</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyBought;
