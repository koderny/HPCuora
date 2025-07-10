// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import * as sessionActions from './store/session';
import HomePage from './components/HomePage/HomePage';
import QuestionDetails from './components/QuestionDetails/QuestionDetails';
import UpdateAQuestion from './components/UpdateAQuestion/UpdateAQuestion';
import FavoritesPage from './components/FavoritesPage/FavoritePage';
import Header from './components/Header/Header';


function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState();


  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Header isLoaded={isLoaded} search = {search} setSearch={setSearch}/>
      {isLoaded && <Outlet context={{search, setSearch}}/>} 
      {/* <Footer/> */}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: "/questions/:id",
        element: <QuestionDetails />
      },
      {
        path: "/questions/:id/edit",
        element: <UpdateAQuestion />
      },
      {
        path: "/favoriteQuestions",
        element: <FavoritesPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;