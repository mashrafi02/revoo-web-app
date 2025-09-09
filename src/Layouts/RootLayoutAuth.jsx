import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Pages/Footer'
import NavBarAuth from '../Components/NavBarAuth'

const RootLayout = () => {
  return (
    <div>
      <NavBarAuth />
      <main className='py-24'>
        <Outlet />
      </main>
      <Footer/>
    </div>
  )
}

export default RootLayout