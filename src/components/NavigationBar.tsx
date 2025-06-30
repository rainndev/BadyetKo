import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiBanknotes } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineAccountCircle } from "react-icons/md";

const navData = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <MdOutlineSpaceDashboard />,
    protected: true,
  },
  // {
  //   path: "/auth",
  //   name: "Log in",
  //   icon: null,
  //   protected: false,
  // },

  {
    path: "/settings",
    name: "Settings",
    icon: <IoSettingsOutline />,
    protected: true,
  },

  {
    path: "/profile",
    name: "Profile",
    icon: <MdOutlineAccountCircle />,
    protected: true,
  },

  // {
  //   path: "/",
  //   name: "Home",
  //   protected: false,
  // },
];

const NavigationBar = () => {
  const { session } = useSession();

  const handleSignout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    session !== null && (
      <div className="min-h-screen p-4 flex flex-col items-center">
        <HiBanknotes className="text-2xl my-15" />

        <ul className="flex flex-col gap-10 h-full items-center">
          <li>menu</li>
          {navData.map((navItem) => (
            <Link
              key={navItem.name}
              className="cursor-pointer"
              to={navItem.path}
            >
              <li>{navItem.icon}</li>
            </Link>
          ))}

          <li
            onClick={() => handleSignout()}
            className="p-2 px-5 text-[#212121] bg-amber-300 rounded-sm "
          >
            Signout
          </li>
        </ul>
      </div>
    )
  );
};

export default NavigationBar;
