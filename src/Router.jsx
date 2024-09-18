import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../src/components/pages/homepage/Home.page.jsx';
import Layout from './components/layout/Layout.jsx';
import LoginPage from './components/pages/auth/Loginpage/LoginPage.jsx';
import SignupPage from './components/pages/auth/signupPage/SignupPage.jsx';
import DashboardPage from './components/pages/dashboard/DashboardPage.jsx';
import Privacy from './components/pages/privacy&policy/Privacy.jsx';

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
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
