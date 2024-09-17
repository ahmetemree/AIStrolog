import { Outlet } from "react-router-dom"
import "./layout.scss"
import Navbar from "../navbar/Navbar"

const Layout = () => {
  return (
    <div className='layout'>
      <Navbar/>
      <Outlet />
    </div>
  )
}

export default Layout