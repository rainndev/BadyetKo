import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import NavigationBar from "./components/NavigationBar";

const Providers = () => {
  return (
    <SessionProvider>
      <div className="bg-medium-light-background min-h-dvh w-full flex text-dark-txt">
        <NavigationBar />
        <Outlet />
      </div>
    </SessionProvider>
  );
};

export default Providers;
