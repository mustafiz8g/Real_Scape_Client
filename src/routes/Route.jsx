
import SignUp from '../Pages/SignUp'
import Login from '../Pages/Login'
import ErrorPage from '../Pages/ErrorPage'
import Home from '../Pages/Home'
import MainLayout from '../Layouts/MainLayout'
import { createBrowserRouter } from 'react-router-dom'
import Profile from '../Pages/Dashboard/Profile'
import AddProperty from '../Pages/Dashboard/AddProperty'
import Wishlist from '../Pages/Dashboard/Wishlist'
import PropertyBought from '../Pages/Dashboard/PropertyBought'
import MyReviews from '../Pages/Dashboard/MyReviews'
import MyAddedProperty from '../Pages/Dashboard/MyAddedProperty'
import MySoldProperty from '../Pages/Dashboard/MySoldProperty'
import RequestedProperty from '../Pages/Dashboard/RequestedProperty'
import ManageProperties from '../Pages/Dashboard/ManageProperties'
import ManageUsers from '../Pages/Dashboard/ManageUsers'
import ManageReviews from '../Pages/Dashboard/ManageReviews'
import AdminRoute from './AdminRoute'
import AgentRoute from './AgentRoute'
import PrivateRoute from './PrivateRoute'


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
      {
        path: 'profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'wishlist',
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
      },
      {
        path: 'property-bought',
        element: <PrivateRoute><PropertyBought></PropertyBought></PrivateRoute>
      }, 
      {
        path: 'my-reviews',
        element: <PrivateRoute><MyReviews></MyReviews></PrivateRoute>
      },
      {
        path: 'add-property',
        element: <PrivateRoute><AgentRoute><AddProperty></AddProperty></AgentRoute></PrivateRoute>
      },
      {
        path: 'my-added-property',
        element: <PrivateRoute><AgentRoute><MyAddedProperty></MyAddedProperty></AgentRoute></PrivateRoute>
      },
      {
        path: 'my-sold-property',
        element: <PrivateRoute><AgentRoute><MySoldProperty></MySoldProperty></AgentRoute></PrivateRoute>
      },
      {
        path: 'requested-property',
        element:<PrivateRoute> <AgentRoute><RequestedProperty></RequestedProperty></AgentRoute></PrivateRoute>
      }, 
      {
        path: 'manage-properties',
        element:<PrivateRoute> <AdminRoute><ManageProperties></ManageProperties></AdminRoute></PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },
      {
        path: 'manage-reviews',
        element:<PrivateRoute> <AdminRoute><ManageReviews></ManageReviews></AdminRoute></PrivateRoute>
      }
      
 
    ],
  },
  {
    path: 'login',
    element: <Login></Login>
  }
  ,
  {
    path: 'signup',
    element: <SignUp></SignUp>
  },
 

  
])
