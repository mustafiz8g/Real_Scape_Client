

import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth() ;
  const [role] = useRole()
//   console.log(role)
  
  return (
    <div className="flex justify-center items-center min-h-[300px] bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-sm w-full">
        <div className="flex flex-col items-center">
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-24 h-24 rounded-full shadow-md mb-4"
          />
          <h1 className="text-xl font-bold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-500">Role: {role}</p>
          <p className="text-sm text-gray-600 mt-2">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;