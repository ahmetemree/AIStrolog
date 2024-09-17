import './navbar.scss';
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <a href="/">
          <img src="/logo.png" alt="" />
          <div className="text">

          <span>AIStrolog</span>
          </div>
        </a>
      </div>
      <div className="options">
        <div className="home">
          <img src="/home.png" alt="" />
          <a href="/">
            <span>Home</span>
          </a>
        </div>

        <div className="dashboard">
          <img src="/dashboard.png" alt="" />
          <a href="/dashboard">
            <span>Dashboard</span>
          </a>
        </div>

        <div className="chat">
          <img src="/chat.png" alt="" />
          <a href="/chat">
            <span>Chat</span>
          </a>
        </div>

        <div className="analysis">
          <img src="/analysis.png" alt="" />
          <a href="/analysis">
            <span>Analysis</span>
          </a>
        </div>
      </div>
      <div className="auth">
        <a href="/login">
          <button>LogIn</button>
        </a>
        <a href="/signup">
          <button>SignUp</button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
