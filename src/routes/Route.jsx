
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
import PropertyDetails from '../Pages/PropertyDetails'
import AllProperties from '../Pages/AllProperties'
import Offer from '../Components/Form/Offer'


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
        path: 'allProperties',
        element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
      }
      ,
      {
        path: 'profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'property/:id',
        element: <PrivateRoute><PropertyDetails></PropertyDetails></PrivateRoute>
      }
      ,
      {
        path: 'wishlist',
        element: <PrivateRoute><Wishlist></Wishlist></PrivateRoute>
      },
      {
        path: 'offer/:id',
        element: <Offer></Offer>
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
        element: <AgentRoute><AddProperty></AddProperty></AgentRoute>
      },
      {
        path: 'my-added-property',
        element: <AgentRoute><MyAddedProperty></MyAddedProperty></AgentRoute>
      },
      {
        path: 'my-sold-property',
        element: <AgentRoute><MySoldProperty></MySoldProperty></AgentRoute>
      },
      {
        path: 'requested-property',
        element: <AgentRoute><RequestedProperty></RequestedProperty></AgentRoute>
      }, 
      {
        path: 'manage-properties',
        element: <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manage-reviews',
        element: <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
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
