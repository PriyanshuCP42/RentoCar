import React from 'react'
import NavbarOwner from '../../components/owner/NavbarOwner'
import SideBar from '../../components/owner/SideBar'
import { Outlet } from 'react-router-dom'
import Dashboard from './Dashboard'

const Layout = () => {
  return (
    <div className='flex flex-col'>
        <NavbarOwner/>
        <div className='flex'>
            <SideBar/>
            <Outlet/>
        </div>
      
    </div>
  )
}

export default Layout
