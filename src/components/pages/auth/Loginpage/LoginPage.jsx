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
           forceRedirectUrl={`/${redirect}`} 
           appearance={{}}
           afterOAuthSignInUrl={`/${redirect}`}
           routing="path"
           signUpMode={true} // Hesabı olmayan kullanıcılar için otomatik kayıt
         />
    </div>
  )
}

export default LoginPage
