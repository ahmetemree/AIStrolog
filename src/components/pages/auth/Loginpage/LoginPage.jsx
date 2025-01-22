import "./loginpage.scss"
import { SignIn } from '@clerk/clerk-react'
import { useRedirectContext } from '../../../../context/RedirectContext';

const LoginPage = () => {
  const { redirect, setRedirect } = useRedirectContext();
  
  return (
    <div className='loginpage'>
         <SignIn 
           path="/login" 
           signUpUrl='/signup'
           redirectUrl='/signup' 
           forceRedirectUrl={`/${redirect}`} 
           appearance={{}}
           afterOAuthSignInUrl={`/${redirect}`}
           routing="path"
           afterSignUpUrl="/user-informations"
           signUpMode="modal"
         />
    </div>
  )
}

export default LoginPage
