import "./navbar.scss"
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
        <img src="/logo.png" alt="" />
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