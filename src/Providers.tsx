import { Outlet } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
import NavigationBar from "./components/NavigationBar";
import CurrencyLoader from "./components/CurrencyLoader";

const Providers = () => {
  return (
    <>
      <SessionProvider>
        <CurrencyLoader />
        <div className="flex w-full max-w-[105rem] flex-col items-center">
          <NavigationBar />
          <Outlet />
        </div>
      </SessionProvider>
    </>
  );
};

export default Providers;
