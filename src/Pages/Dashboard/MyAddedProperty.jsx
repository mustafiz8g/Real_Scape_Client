



import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import Container from "../../Components/Shared/Container";
import { Link } from "react-router-dom";

const MyAddedProperty = () => {
  const { user } = useAuth(); 
  const queryClient = useQueryClient(); 

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties`);
      return data;
    },
    enabled: !!user?.email, 
  });

  const userProperties = properties.filter(
    (property) => property.agent?.email === user?.email
  );

  // Mutation for deleting a property
  const deleteMutation = useMutation({
    mutationFn: async (propertyId) => {
      await axios.delete(`${import.meta.env.VITE_API_URL}/properties/${propertyId}`);
    },
    onSuccess: () => {
      toast.success("Property deleted successfully!");
      queryClient.invalidateQueries(["properties", user?.email]); // Refetch properties
    },
    onError: () => {
      toast.error("Failed to delete the property.");
    },
  });



  // Handle loading state
  if (isLoading) return <LoadingSpinner />;

  // Render the UI
  return (
    <Container>
      {userProperties && userProperties.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {userProperties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-md rounded-lg p-4 border flex flex-col"
            >
              {/* Property Image */}
              <img
                src={property.image || "https://via.placeholder.com/300"}
                alt={property.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Property Details */}
              <h3 className="text-lg font-semibold">{property.title}</h3>
              <p className="text-sm text-gray-600">Location: {property.location}</p>
              <p className="text-sm text-gray-600">
                Price: ${property.minPrice?.toLocaleString()} - ${property.maxPrice?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                Verified: {property.verification ? "Yes" : "No"}
              </p>

              {/* Agent Information */}
              <div className="flex items-center mt-2">
                <img
                  src={property.agent?.image || "/default-avatar.png"}
                  alt={property.agent?.name}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-sm text-gray-600">{property.agent?.name}</span>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-between gap-2">
                {/* Update Button */}
                <Link to={`/property/update/${property._id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Update
                </button></Link>

                {/* Delete Button */}
                <button
                  onClick={() => deleteMutation.mutate(property._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="text-center text-xl text-gray-600 mt-12">No Properties Found</h1>
      )}
    </Container>
  );
};

export default MyAddedProperty;
