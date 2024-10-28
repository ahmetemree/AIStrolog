import { useNavigate } from "react-router-dom";
import "./redirect_signup_page.scss"
const RedirectSignupPage = () => {
    const navigate = useNavigate();
  return (
    <div className="redirectsignuppage">
      <h3>You are not signed up yet, please sign up to continue</h3>
      <button onClick={() => {
        navigate('/signup')
      }}>Signup</button>
    </div>
  )
}

export default RedirectSignupPage