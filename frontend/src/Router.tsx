import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ), // Use Layout as the wrapper
    children: [
      { path: '/', element: <HomePage /> }, // Define child route
      // Add more child routes here
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
