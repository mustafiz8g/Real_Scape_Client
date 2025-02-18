import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import LoadingSpinner from '../Components/Shared/LoadingSpinner';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

const Login = () => {
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || '/';

  if (user) return <Navigate to={from} replace={true} />;

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    // Reset errors
    setErrors({ email: '', password: '' });

    try {
      // User Login
      await signIn(email, password);

      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      // Display errors for email or password mismatch
      const errorMessage = err?.message || 'Something went wrong!';
      if (errorMessage.includes('user-not-found')) {
        setErrors({ email: 'Email not found. Please register first.' });
      } else if (errorMessage.includes('wrong-password')) {
        setErrors({ password: 'Incorrect password. Please try again.' });
      } else {
        toast.error(errorMessage);
      }
    }
  };

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from, { replace: true });
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err?.message || 'Google Sign-In Failed!');
    }
  };

  return (
    <div className="flex justify-center min-h-[800px] items-center ">
      <div className="flex flex-col max-w-md p-8  border shadow-lg rounded-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-blue-600">Welcome Back</h1>
          <p className="">Log in to access your account</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className=" mb-1 text-sm font-semibold ">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                className={`w-full px-4 py-2  rounded-lg ${
                  errors.email ? 'border-red-500' : ''
                } focus:outline-none focus:ring-2 ${
                  errors.email ? 'focus:ring-red-400' : 'focus:ring-blue-500'
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block mb-1 text-sm font-semibold ">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*******"
                required
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.password ? 'border-red-500' : ''
                } focus:outline-none focus:ring-2 ${
                  errors.password ? 'focus:ring-red-400' : 'focus:ring-blue-500'
                }`}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>
          </div>

          {/* Login Button */}
          <div>
            <button
              type="submit"
              className="w-full py-3  bg-blue-500 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
          </div>
        </form>

        {/* Forgot Password */}
        <div className="mt-3 text-center">
          <button className="text-sm text-blue-500 hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="px-3 text-sm ">or</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-3 border py-2 px-4 rounded-lg cursor-pointer hover:bg-[#155dfc]"
        >
          <FcGoogle size={28} />
          <p className="hover:bg-[#155dfc] font-medium">Sign in with Google</p>
        </div>

        {/* Sign Up Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
