import TransparentLogo from "@/assets/logos/transaprent-logo-w-text.png";
import { useSession } from "../context/SessionContext";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
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

  return (
    session !== null && (
      <div className="bg-light-background md:bg-medium-light-background fixed right-0 bottom-0 left-0 z-1 flex flex-col items-center justify-center border-2 border-t p-3 md:static md:z-0 md:min-h-screen md:border-none md:p-8">
        <img
          src={TransparentLogo}
          className="my-10 hidden max-w-35 md:block lg:max-w-40"
          alt="Transaparent logo with text"
        />

        <ul className="text-dark-txt/50 flex h-full w-full items-start justify-between gap-5 px-5 text-xl md:flex-col md:justify-normal md:px-0">
          {navData.map((navItem) => (
            <NavLink
              key={navItem.name}
              className="hover:bg-dark-background/10 flex w-full cursor-pointer items-center justify-start gap-2 rounded-lg px-5 py-3 transition-colors ease-in-out"
              to={navItem.path}
            >
              <li>{navItem.icon}</li>
              <li className="hidden text-[clamp(.6rem,2vw+.6rem,.9rem)] md:block">
                {navItem.name}
              </li>
            </NavLink>
          ))}
        </ul>
      </div>
    )
  );
};

export default NavigationBar;
