import React, { useContext } from 'react'
import './Profile.css'
import { loginContext } from '../../contexts/logincontext'
import { NavLink, Outlet } from 'react-router-dom';

function Profile() {
    const activeLink={
        color:"#ffaa00",
        fontSize:"1.2rem",
        fontWeight:"bold"

    };
    const inactiveLink={
        color:"black",
        fontSize:"1.2rem",
    
    };

    let [currentuser] = useContext(loginContext);
  return (
    <div>
        {/* <script>console.log(user);</script> */}
      <p className="display-5 text-end">Welcome ,{currentuser.name}</p>
      <img src={currentuser.image} width="100px" alt="" className="float-end" />
      <ul className='bg-white justify-content-between'>
        <li className="">
          <NavLink className="" to='Product' style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }}>Products</NavLink>
        </li>
        <li className="">
          <NavLink className="" to='Carts' style={({isActive})=>{
            return isActive?activeLink:inactiveLink;
          }}>Carts</NavLink>
        </li>
        </ul>
        <Outlet />
    </div>
  )
}
export default Profile
