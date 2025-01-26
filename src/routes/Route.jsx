
import SignUp from '../Pages/SignUp'
import Login from '../Pages/Login'
import ErrorPage from '../Pages/ErrorPage'
import Home from '../Pages/Home'
import MainLayout from '../Layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      
 
    ],
  },
  {
    path: '/login',
    element: <Login></Login>
  }
  ,
  {
    path: '/signup',
    element: <SignUp></SignUp>
  },
 

  
])
