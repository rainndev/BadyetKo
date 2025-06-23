import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import NavigationBar from "./components/NavigationBar";

const Providers = () => {
  return (
    <SessionProvider>
      <div className="bg-[#212121] text-amber-300">
        <NavigationBar />
        <Outlet />
      </div>
    </SessionProvider>
  );
};

export default Providers;
