import { RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../layout/App';
import HomePage from '../../features/Home/HomePage';
import CallbackPage from '../../features/Home/Callback';
import PetsMain from '../../features/Pets/PetsMain';
import PetForm from '../../features/Pets/PetForm';


export const routes: RouteObject[] = [
    {
    path: '/',
    element: <App />,
    children: [
        { path: '/', element: <HomePage /> }, // Set HomePage as the default route for '/'
        { path: 'callback', element: <CallbackPage /> },  // after login single sign on server returns to this page
        { path: 'pets', element: <PetsMain />},
        { path: 'petform', element: <PetForm />},
        { path: 'petform/:id', element: <PetForm />},
        { path: '*', element: <HomePage /> }, // Wildcard to redirect any undefined paths to HomePage
    ]
  }
];

export const router = createBrowserRouter(routes, {
    basename: '/template',
  });
