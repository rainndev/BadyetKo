import { createBrowserRouter } from "react-router-dom";
import Providers from "../Providers";
import AuthProtectedRoute from "./AuthProtectedRoute";
import AuthPage from "../pages/AuthPage";
import DashboardPage from "../pages/DashboardPage";
import TransactionsPage from "../pages/TransactionsPage";
import SettingsPage from "@/pages/SettingsPage";
import ProfilePage from "@/pages/ProfilePage";

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
        path: "/auth",
        element: <AuthPage />,
      },

      {
        element: <AuthProtectedRoute />,
        children: [
          {
            path: "/dashboard",
            element: <DashboardPage />,
          },

          {
            path: "/bank/:bank_id",
            element: <TransactionsPage />,
          },

          {
            path: "/settings",
            element: <SettingsPage />,
          },

          {
            path: "/profile",
            element: <ProfilePage />,
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
