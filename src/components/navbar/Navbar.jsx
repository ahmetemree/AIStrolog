import "./navbar.scss"
import logo from "/logo.png"
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="options">
        <span>Home</span>
        <span>Dashboard</span>
        <span>Chat</span>
        <span>Analysis</span>
      </div>
      <div className="auth"></div>
    </div>
  )
}

export default Navbar