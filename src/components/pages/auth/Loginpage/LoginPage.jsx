import "./loginpage.scss"
import { SignIn } from '@clerk/clerk-react'

const LoginPage = () => {
  return (
    <div className='loginpage'>
         <SignIn path="/login" signUpUrl='/signup' forceRedirectUrl="/dashboard" appearance={{}}/>
    </div>
  )
}

export default LoginPage