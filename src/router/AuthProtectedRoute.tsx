import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { useEffect } from "react";

const AuthProtectedRoute = () => {
  const navigate = useNavigate();
  const { session } = useSession();
  useEffect(() => {
    if (session === null) {
      navigate("/auth", { replace: true });
    }
  }, [session, navigate]);

  return <Outlet />;
};

export default AuthProtectedRoute;
