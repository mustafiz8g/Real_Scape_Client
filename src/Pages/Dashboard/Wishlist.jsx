

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import WishlistCard from "../../Components/WishlistCard";
import Container from "../../Components/Shared/Container";
import toast from "react-hot-toast"; // For toast notifications

const Wishlist = () => {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/wishlists`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;
  const handleRemove = async (id) => {
    try {
      
      await axios.delete(`${import.meta.env.VITE_API_URL}/wishlists/${id}`);
      toast.success("Item deleted successfully!"); 
      refetch();
    } catch (error) {
      toast.error(error.response?.data); 
    }
  };

  return (
    <Container>
      {data && data.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {data.map((wishlist) => (
            <WishlistCard
              key={wishlist._id}
              refetch={refetch}
              wishlist={wishlist}
              onRemove={handleRemove} 
            />
          ))}
        </div>
      ) : (
        <h1>No Property Found</h1>
      )}
    </Container>
  );
};

export default Wishlist;
