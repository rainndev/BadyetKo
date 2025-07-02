import { useSession } from "../context/SessionContext";
import { NavLink } from "react-router-dom";
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
      <div className="bg-light-background md:bg-medium-light-background fixed right-0 bottom-0 left-0 z-9999 flex flex-col items-center justify-center border-2 border-t p-3 md:static md:z-0 md:min-h-screen md:border-none md:p-10">
        <HiBanknotes className="my-15 hidden text-2xl md:block" />

        <ul className="text-dark-txt/50 flex h-full w-full items-center justify-between gap-10 px-5 text-xl md:flex-col md:justify-normal md:px-0">
          {navData.map((navItem) => (
            <NavLink
              key={navItem.name}
              className="cursor-pointer"
              to={navItem.path}
            >
              <li>{navItem.icon}</li>
            </NavLink>
          ))}

          <li
            onClick={() => handleSignout()}
            className="text-light-background bg-dark-background rounded-sm p-2.5 md:p-3"
          >
            <RiLogoutCircleLine />
          </li>
        </ul>
      </div>
    )
  );
};

export default NavigationBar;
