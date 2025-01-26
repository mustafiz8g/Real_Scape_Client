

import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src={user.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-500">ID: {user.id}</p>
          <p className="text-sm text-gray-600 mt-2">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;