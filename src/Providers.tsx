import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import NavigationBar from "./components/NavigationBar";

const Providers = () => {
  return (
    <SessionProvider>
      <div className="bg-medium-light-background text-dark-txt relative flex min-h-dvh w-screen">
        <NavigationBar />
        <Outlet />
      </div>
    </SessionProvider>
  );
};

export default Providers;
