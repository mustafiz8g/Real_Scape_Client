import { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '../../Components/Shared/Container';

const RequestedProperty = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/offers`);
                setOffers(response.data);
            } catch (error) {
                console.error('Error fetching offers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOffers();
    }, []);

    const handleAccept = async (offerId) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/offers/${offerId}/accept`);
            setOffers(offers.map(offer => 
                offer._id === offerId 
                    ? { ...offer, boughtStatus: 'accepted' } 
                    : offer.propertyId === offers.find(o => o._id === offerId)?.propertyId 
                        ? { ...offer, boughtStatus: 'rejected' } 
                        : offer
            ));
        } catch (error) {
            console.error('Error accepting offer:', error);
        }
    };

    const handleReject = async (offerId) => {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/offers/${offerId}/reject`);
            setOffers(offers.map(offer => offer._id === offerId ? { ...offer, boughtStatus: 'rejected' } : offer));
        } catch (error) {
            console.error('Error rejecting offer:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <Container>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Requested Properties</h2>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                <th className="py-3 px-4">Title</th>
                                <th className="py-3 px-4">Buyer Email</th>
                                <th className="py-3 px-4">Buyer Name</th>
                                <th className="py-3 px-4">Offered Price</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.map(offer => (
                                <tr key={offer._id} className="border-b hover:bg-gray-100 transition">
                                    <td className="py-3 px-4">{offer.title}</td>
                                    <td className="py-3 px-4">{offer.userEmail}</td>
                                    <td className="py-3 px-4">{offer.userName}</td>
                                    <td className="py-3 px-4">${offer.amount}</td>
                                    <td className="py-3 px-4 font-bold">{offer.boughtStatus}</td>
                                    <td className="py-3 px-4">
                                        {offer.boughtStatus === 'pending' && (
                                            <div className="flex justify-center gap-2">
                                                <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={() => handleAccept(offer._id)}>Accept</button>
                                                <button className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded" onClick={() => handleReject(offer._id)}>Reject</button>
                                            </div>
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

export default RequestedProperty;
