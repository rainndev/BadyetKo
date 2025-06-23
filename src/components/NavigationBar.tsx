import React from "react";
import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
import supabase from "../supabase/supabase-client";

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

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <div className="w-full flex items-center justify-center p-4">
      <ul className="max-w-7xl flex justify-between w-full items-center">
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

        {session !== null && (
          <li
            onClick={() => handleSignout()}
            className="p-2 px-5 text-[#212121] bg-amber-300 rounded-sm "
          >
            Signout
          </li>
        )}
      </ul>
    </div>
  );
};

export default NavigationBar;
