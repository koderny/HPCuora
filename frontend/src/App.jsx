import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import * as sessionActions from './store/session';
import Home from './components/Home';
import SpotDetails from './components/SpotDetails';
import CreateASpot from './components/CreateASpot/CreateASpot';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/spots/:id',
        element: <SpotDetails />
      },
      {
        path: 'spots/new',
        element: <CreateASpot />
      },
      // {
      //   path: "spots/current",
      //   element: <UserSpots />
      // }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;