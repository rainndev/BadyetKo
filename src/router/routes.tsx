import { createBrowserRouter } from "react-router-dom";
import Providers from "../Providers";
import LoginPage from "../pages/LoginPage";
import AuthProtectedRoute from "./AuthProtectedRoute";
import SignupPage from "../pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Providers />,
    //public routes
    children: [
      {
        path: "",
        element: (
          <div className="w-full h-dvh flex items-center justify-center bg-[#212121] text-amber-300">
            Home page
          </div>
        ),
      },

      {
        path: "/login",
        element: <LoginPage />,
      },

      {
        path: "/signup",
        element: <SignupPage />,
      },

      {
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/protected",
            element: (
              <div
                className="w-full bg-[#212121] text-amber-300 h-screen flex justify-between items-center 
            "
              >
                Protected
              </div>
            ),
          },
        ],
      },
    ],
  },

  {
    path: "*",
    element: (
      <p className="w-full h-screen flex items-center justify-center bg-[#212121] text-amber-300">
        404 not found
      </p>
    ),
  },
]);

export default router;
