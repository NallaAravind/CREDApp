import React from 'react'
import Navigation from './navigationbar/navigation'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Userloginstore from '../contexts/Userloginstore'

function RootLayout() {
  return (
      <div>
      <Navigation />
      <div style={{minHeight:"80vh"}}>  
      <Outlet />
    </div>
    <Footer />
    {/* <AddUser /> */}
    </div>
  )
}

export default RootLayout
