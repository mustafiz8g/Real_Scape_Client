

import { FaBars } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [role, isLoading] = useRole()

  // const defaultPhoto = "https://i.ibb.co.com/TTNz5Yp/Screenshot-2024-12-22-103839.png"



  const navOptions = < >
    <li><NavLink className='font-bold ' to='/'>Home</NavLink></li>
    <li><NavLink className='font-bold ' to='/allProperties'>All Properties</NavLink></li>
  </>



  const navOptions2 = <>
    {
      role === 'customer' && <>
        <li><NavLink className='font-bold ' to='/profile'>Profile</NavLink></li>

        <li><NavLink className='font-bold' to='/wishlist'>Wishlist</NavLink></li>
        <li><NavLink className='font-bold ' to='/property-bought'>Property bought</NavLink></li>
        <li><NavLink className='font-bold ' to='/my-reviews'>My reviews</NavLink></li>
      </>
    }

    {/* agent dashboard  */}
    {
      role === 'agent' && <>
        <li><NavLink className='font-bold ' to='/profile'>Profile</NavLink></li>

        <li><NavLink className='font-bold ' to='/add-property'>Add Property</NavLink></li>
        <li><NavLink className='font-bold ' to='/my-added-property'>My added properties</NavLink></li>
        <li><NavLink className='font-bold ' to='/my-sold-property'>My sold properties</NavLink></li>
        <li><NavLink className='font-bold ' to='/requested-property'>Requested properties</NavLink></li>
      </>
    }
    {/* admin profile  */}

    {
      role === 'admin' && <>
        <li><NavLink className='font-bold ' to='/profile'>Profile</NavLink></li>

        <li><NavLink className='font-bold ' to='/manage-properties'>Manage Properties</NavLink></li>
        <li><NavLink className='font-bold ' to='/manage-users'>Manage Users</NavLink></li>
        <li><NavLink className='font-bold ' to='/manage-reviews'>Manage Reviews</NavLink></li>
      </>
    }

    <li><button className="  font-bold" onClick={logOut}>Log Out</button> </li>
  </>



  return (
    <div className="z-50 sticky top-0 navBar  ">
      <div className="w-11/12 mx-auto navbar flex justify-between ">

        <div className="first">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <FaBars className="text-xl" />

            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow ">
              {navOptions}
            </ul>
          </div>
          <Link to='/' className=" text-3xl font-bold">REAL <span className="text-blue-600 font-bold">SCAPE</span></Link>
        </div>
        <div className="flex justify-between items-center">
          <div className="second hidden md:flex">
            <ul className="menu menu-horizontal  px-1 ">
              {navOptions}
            </ul>

          </div>
          <div className="third">

            <div className="*:font-bold">

              {
                user ?

                  <div className="dropdown">
                    <div tabIndex={0} role="button" className="">
                      <div className="flex justify-center items-center gap-2">

                        <div className="w-12 h-12">
                          <img title={user.displayName} className="w-full h-full  object-contain rounded-full border  border-white border-2 hover:border-orange-400" src={user?.photoURL} alt="profile" />
                        </div>
                      </div>

                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 right-3 shadow ">
                      {navOptions2}
                    </ul>
                  </div>


                  :
                  <div>
                    <Link className="hover:underline  decoration-2 underline-offset-2 font-bold" to='/login' >Login</Link>
                    <span> / </span>
                    <Link className="hover:underline  decoration-2 underline-offset-2 font-bold" to='/signup' >Register</Link>
                  </div>
              }


            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Navbar;