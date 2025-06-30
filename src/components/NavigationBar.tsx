import { useSession } from "../context/SessionContext";
import { Link } from "react-router-dom";
import supabase from "../supabase/supabase-client";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiBanknotes } from "react-icons/hi2";
import { TbSettings2 } from "react-icons/tb";
import { MdOutlineAccountCircle } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

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
    icon: <TbSettings2 />,
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
      <div className="flex min-h-screen flex-col items-center p-4">
        <HiBanknotes className="my-15 text-2xl" />

        <ul className="text-dark-txt/80 flex h-full flex-col items-center gap-10 text-xl">
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
            className="text-light-background bg-dark-background rounded-sm p-3"
          >
            <RiLogoutCircleLine />
          </li>
        </ul>
      </div>
    )
  );
};

export default NavigationBar;
