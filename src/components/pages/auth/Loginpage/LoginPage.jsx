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
           redirectUrl='/signup'  // Hesap bulunamadığında signup sayfasına yönlendirir
           forceRedirectUrl={`/${redirect}`} 
           appearance={{}}
           afterOAuthSignInUrl={`/${redirect}`}
           routing="path"
           // signUpMode özelliğini kaldırıyoruz çünkü redirectUrl ile yönetiyoruz
         />
    </div>
  )
}

export default LoginPage
