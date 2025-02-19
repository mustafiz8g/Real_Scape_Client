import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Container from '../../Components/Shared/Container';
import TitleSubTitle from '../../Components/TitleSubTitle';


const fetchProperties = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/properties`);
    return data;
};

const ManageProperties = () => {
    const queryClient = useQueryClient();
    const { data: properties = [] } = useQuery({ queryKey: ['properties'], queryFn: fetchProperties });

    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            await axios.patch(`${import.meta.env.VITE_API_URL}/properties/${id}`, { status });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['properties']);
        },
    });

    return (
       <Container>
         <div className="p-6  min-h-screen">

            <TitleSubTitle title='Manage properties'></TitleSubTitle>
            <div className="overflow-x-auto">
                <table className="w-full  shadow-lg rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 ">
                        <tr>
                            <th className="py-3 px-4">Title</th>
                            <th className="py-3 px-4">Location</th>
                            <th className="py-3 px-4">Agent Name</th>
                            <th className="py-3 px-4">Agent Email</th>
                            <th className="py-3 px-4">Price Range</th>
                            <th className="py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(property => (
                            <tr key={property._id} className="border-b hover: transition">
                                <td className="py-3 px-4">{property.title}</td>
                                <td className="py-3 px-4">{property.location}</td>
                                <td className="py-3 px-4">{property.agent.name}</td>
                                <td className="py-3 px-4">{property.agent.email}</td>
                                <td className="py-3 px-4">${property.minPrice} - ${property.maxPrice}</td>
                                <td className="py-3 px-4 text-center">
                                    {property.verification === 'pending' ? (
                                        <div className="flex justify-center gap-2">
                                            <button onClick={() => mutation.mutate({ id: property._id, status: 'verified' })} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">Verify</button>
                                            <button onClick={() => mutation.mutate({ id: property._id, status: 'rejected' })} className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded">Reject</button>
                                        </div>
                                    ) : (
                                        <span className={`px-3 py-1 rounded-full text-white ${property.verification === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}>{property.verification}</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
       </Container>
    );
};

export default ManageProperties;