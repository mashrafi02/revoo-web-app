import React from 'react'
import NavbarPrivateProf from '../Components/NavBarPrivateProf';
import { Outlet } from 'react-router-dom';

const RootLayoutPrivateProf = () => {
  return (
    <div>
      <NavbarPrivateProf />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayoutPrivateProf