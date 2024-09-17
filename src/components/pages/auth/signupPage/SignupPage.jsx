import { SignUp } from "@clerk/clerk-react"
import "./signuppage.scss"
const SignupPage = () => {
  return (
    <div className='signuppage'>
        <SignUp path="/signup" signInUrl='/login'/>
    </div>
  )
}

export default SignupPage