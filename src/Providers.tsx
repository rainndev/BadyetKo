import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";

const Providers = () => {
  return (
    <SessionProvider>
      <div className="bg-[#212121] text-amber-300">
        <Outlet />
      </div>
    </SessionProvider>
  );
};

export default Providers;
