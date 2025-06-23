import React from "react";
import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";

const navData = [
  {
    path: "/dashboard",
    name: "Dashboard",
    protected: true,
  },
  {
    path: "/auth",
    name: "Log in",
    protected: false,
  },
  {
    path: "/",
    name: "Home",
    protected: false,
  },
];

const NavigationBar = () => {
  const { session } = useSession();

  return (
    <div className="w-full flex items-center justify-center p-4">
      <ul className="max-w-7xl flex justify-between w-full">
        {navData
          .filter((navItem) => session !== null || !navItem.protected)
          .map((navItem) => (
            <Link
              key={navItem.name}
              className="cursor-pointer"
              to={navItem.path}
            >
              <li>{navItem.name}</li>
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default NavigationBar;
