import "./navbar.scss"
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="logo">
        <img src="/logo.png" alt="" />
      </div>
      <div className="options">
        <a href="/"><span>Home</span></a>
        <a href="/dashboard"><span>Dashboard</span></a>
        <a href="/chat"><span>Chat</span></a>
        <a href="/analysis"><span>Analysis</span></a>
      </div>
      <div className="auth">
        <a href="/login"><button >LogIn</button></a>
        <a href="/signup"><button>SignUp</button></a>
      </div>
    </div>
  )
}

export default Navbar