


import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import Container from '../Components/Shared/Container';
import AllPropertyCard from './AllPropertyCard';

const AllProperties = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [sortOption, setSortOption] = useState('');

  const { data: properties, isLoading, refetch } = useQuery({
    queryKey: ['properties', searchLocation, sortOption],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/propertiess`, {
        params: {
          location: searchLocation,
          sort: sortOption,
        },
      });
      return data;
    },
  });

  const handleSearch = () => {
    refetch(); // Refetch the data based on the updated query
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      {/* Search and Sort */}
      <div className="join">
        <div>
          <div>
            <input
              className="input input-bordered join-item"
              placeholder="Search by location"
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
            />
          </div>
        </div>
        <select
          className="select select-bordered join-item"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option disabled value="">
            Sort by Price
          </option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
        <div className="indicator">
          <button className="btn join-item" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      {/* Properties List */}
      {properties && properties.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {properties.map((property) => (
            <AllPropertyCard key={property._id} property={property} />
          ))}
        </div>
      ) : (
        <h1>No Property Found</h1>
      )}
    </Container>
  );
};

export default AllProperties;
