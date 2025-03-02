import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../src/components/pages/homepage/Home.page.jsx';
import Layout from './components/layout/Layout.jsx';
import LoginPage from './components/pages/auth/Loginpage/LoginPage.jsx';
import SignupPage from './components/pages/auth/signupPage/SignupPage.jsx';
import DashboardPage from './components/pages/dashboard/DashboardPage.jsx';
import Privacy from './components/pages/privacy&policy/Privacy.jsx';
import Chat from './components/pages/chat/chat/Chat.jsx';
import Analysis from './components/pages/Analysis/Analysis.jsx';
import Subscriptions from './components/pages/subscriptions/Subscriptions.jsx';
import Contact from './components/pages/contact/Contact.jsx';
import RedirectSignupPage from './components/pages/redirect_sign_up_page/redirect_signup_page.jsx';
import UserInformations from './components/pages/userInformations/UserInformations.jsx';
import Construction from './components/pages/constructionPage/Construction.jsx';
import UnknownPage from './components/pages/unknownPage/unknownPage.jsx';
import DistanceAgreement from './components/pages/distanceSalesAgreement/DistanceAgreement.jsx';
import ServiceAgreement from './components/pages/service-agreement/ServiceAgreement.jsx';
import Payment from './components/pages/payment/Payment.jsx';

const router = createBrowserRouter([
  {

    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage/>,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
      {
        path: '/dashboard',
        element: <DashboardPage />,
      },
      {
        path: '/privacy-policy',
        element: <Privacy />,
      },
      {
        path: '/chat/:id?',
        element: <Chat />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/analysis',
        element: <Construction />,
      },
      {
        path: '/subscriptions',
        element: <Subscriptions />,
      },
      {
        path: '/login/sso-callback',
        element: <RedirectSignupPage />,
      },
      {
        path: '/user-informations',
        element: <UserInformations />,
      },
      {
        path: '/distance-sales-agreement',
        element: <DistanceAgreement />,
      },
      {
        path: '/service-agreement',
        element: <ServiceAgreement />,
      },
      {
        path: '/payment/:subscription?',
        element: <Payment />,
      },
      {
        path: '*',
        element: <UnknownPage />
      }
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
