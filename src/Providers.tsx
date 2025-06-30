import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import NavigationBar from "./components/NavigationBar";

const Providers = () => {
  return (
    <SessionProvider>
      <div className="bg-medium-light-background text-dark-txt flex min-h-dvh w-full">
        <NavigationBar />
        <Outlet />
      </div>
    </SessionProvider>
  );
};

export default Providers;
