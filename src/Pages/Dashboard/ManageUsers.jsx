import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from '../../Components/Shared/Container';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users from the backend
        axios.get(`${import.meta.env.VITE_API_URL}/users`)
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the users!", error);
                toast.error('Error fetching users');
            });
    }, []);

    const handleRoleChange = (userId, newRole) => {
        axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}/role`, { role: newRole })
            .then(response => {
                setUsers(users.map(user => 
                    user._id === userId ? response.data : user
                ));
                toast.success(`${newRole.charAt(0).toUpperCase() + newRole.slice(1)} role assigned successfully!`);
            })
            .catch(error => {
                console.error(error);
                toast.error('Error updating user role');
            });
    };

    const handleDeleteUser = (userId) => {
        axios.delete(`${import.meta.env.VITE_API_URL}/users/${userId}`)
            .then(() => {
                setUsers(users.filter(user => user._id !== userId));
                toast.success('User deleted successfully!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Error deleting user');
            });
    };

    const handleFraud = (userId) => {
        axios.put(`${import.meta.env.VITE_API_URL}/users/${userId}/fraud`)
            .then(response => {
                setUsers(users.map(user => 
                    user._id === userId ? response.data : user
                ));
                toast.success('User marked as fraud!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Error marking as fraud');
            });
    };

    return (
       <Container>
         <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">Manage Users</h2>
            <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full table-auto">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-3 px-6 text-left">User Name</th>
                            <th className="py-3 px-6 text-left">Email</th>
                            <th className="py-3 px-6 text-left">Role</th>
                            <th className="py-3 px-6 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b hover:bg-gray-100">
                                <td className="py-4 px-6">
                                    {user.name }
                                    {user.status === 'fraud' && (
                                        <span className="text-red-500 ml-2 text-sm font-bold">Fraud</span>
                                    )}
                                </td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">{user.role}</td>
                                <td className="py-4 px-6 space-x-2">
                                    {user.role !== 'admin' && (
                                        <button
                                            onClick={() => handleRoleChange(user._id, 'admin')}
                                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
                                        >
                                            Make Admin
                                        </button>
                                    )}
                                    {user.role !== 'agent' && (
                                        <button
                                            onClick={() => handleRoleChange(user._id, 'agent')}
                                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                                        >
                                            Make Agent
                                        </button>
                                    )}
                                    {user.role === 'agent' && (
                                        <button
                                            onClick={() => handleFraud(user._id)}
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none"
                                        >
                                            Mark as Fraud
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                                    >
                                        Delete User
                                    </button>
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

export default ManageUsers;
