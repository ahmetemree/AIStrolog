import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from '../src/components/pages/Home.page.jsx';
import Layout from './components/layout/Layout.jsx';

const router = createBrowserRouter([
  {

    element: <Layout/>,
    children:[
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/about',
        element: <HomePage />,
      },
    ]
  }
]);

export function Router() {
  return <RouterProvider router={router} />;
}
