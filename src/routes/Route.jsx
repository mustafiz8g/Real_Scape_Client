
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
        element:<Profile></Profile>
      },
      {
        path: 'wishlist',
        element: <Wishlist></Wishlist>
      },
      {
        path: 'property-bought',
        element: <PropertyBought></PropertyBought>
      }, 
      {
        path: 'my-reviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'add-property',
        element: <AddProperty></AddProperty>
      },
      {
        path: 'my-added-property',
        element: <MyAddedProperty></MyAddedProperty>
      },
      {
        path: 'my-sold-property',
        element: <MySoldProperty></MySoldProperty>
      },
      {
        path: 'requested-property',
        element: <RequestedProperty></RequestedProperty>
      }, 
      {
        path: 'manage-properties',
        element: <ManageProperties></ManageProperties>
      },
      {
        path: 'manage-users',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'manage-reviews',
        element: <ManageReviews></ManageReviews>
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
