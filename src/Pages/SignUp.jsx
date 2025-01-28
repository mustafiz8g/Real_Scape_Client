import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useAuth from '../hooks/useAuth'
import { imageUpload } from '../hooks/Utils'
import { FaGoogle } from 'react-icons/fa'

const SignUp = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  // Validate password
  const validatePassword = (password) => {
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long')
      return false
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter')
      return false
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error('Password must contain at least one special character')
      return false
    }
    return true
  }

  // Form submit handler
  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]

    if (!validatePassword(password)) return

    const photoURL = await imageUpload(image)

    try {
      const result = await createUser(email, password)
      await updateUserProfile(name, photoURL)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      toast.error(err?.message)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white shadow-md">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-blue-600">Sign Up</h1>
          <p className="text-sm text-gray-500">Welcome to RealScape</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md focus:outline-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">Select Image:</label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 focus:outline-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-900 focus:outline-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-500">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border p-2 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <FaGoogle />
          <p>Continue with Google</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:underline"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp
