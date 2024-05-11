import React from 'react';
import { useContext } from 'react';
import './navigationbar.css';
import { Link, NavLink } from 'react-router-dom';
import { loginContext } from '../../contexts/logincontext';

function Navigation() {
  let [user, error, userloginstatus, loginUser, logoutUser] = useContext(loginContext);
  return (
    <div className=" h-30">
      <ul className='h-25'>
        <li className="nav-item px-3">
          <NavLink className="nav-link" to='/Users'>Home</NavLink>
        </li>
        <li className="nav-item px-3">
          <NavLink className="nav-link" to='/Register'>Register</NavLink>
        </li>
        {userloginstatus === false ?
          (<li className="nav-item px-3">
            <NavLink className="nav-link" to='/Login'>Login</NavLink>
          </li>) :
          (<li className="nav-item px-3">
            <NavLink className="nav-link" to='/Login' onClick={logoutUser}>Logout</NavLink>
          </li>)
        }
        <li className="nav-item">
          <NavLink className="nav-link" to='/AboutUs'>AboutUs</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
