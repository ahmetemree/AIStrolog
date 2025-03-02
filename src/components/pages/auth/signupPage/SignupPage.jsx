import { SignUp } from "@clerk/clerk-react"
import "./signuppage.scss"
const SignupPage = () => {
  return (
    <div className='signuppage'>
        <SignUp 
        path="/signup"
           signInUrl='/login' redirectUrl='/user-informations'/>
    </div>
  )
}

export default SignupPage