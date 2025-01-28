import React, { useContext } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./context/AuthContext";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn)
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Homepage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/" replace /> : <Login />,
    },
    {
      path: "/signup",
      element: isLoggedIn ? <Navigate to="/" replace/> : <Signup />,
    },
  ]);
  return <RouterProvider router={appRouter} />;
};

export default App;
