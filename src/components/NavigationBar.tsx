import { useSession } from "../context/SessionContext";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { TbSettings2 } from "react-icons/tb";
import { MdOutlineAccountCircle } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";

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
    path: "/category",
    name: "Category",
    icon: <BiCategoryAlt />,
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
      <div className="bg-medium-light-background/20 fixed right-0 bottom-0 left-0 z-20 flex w-full flex-col items-center justify-center border-t-2 p-3 backdrop-blur-lg lg:static lg:top-0 lg:border-none lg:bg-transparent lg:p-10 lg:pb-0 lg:backdrop-blur-none">
        {/* <img
          src={TransparentLogo}
          className="my-10 hidden max-w-35 p-2 lg:block lg:max-w-40"
          alt="Transaparent logo with text"
        /> */}

        <ul className="text-dark-txt/50 lg:bg-medium-light-background flex h-full w-full items-start justify-between gap-2 rounded-2xl border-none text-xl lg:flex lg:max-w-7xl lg:justify-center lg:border lg:p-3 lg:px-3">
          {navData.map((navItem) => (
            <NavLink
              key={navItem.name}
              className="hover:bg-dark-background/10 border-dark-background/50 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg px-3 py-3 transition-colors ease-in-out lg:justify-center lg:px-5"
              to={navItem.path}
            >
              <div className="flex items-center gap-2">
                <li>{navItem.icon}</li>
                <li className="text-fluid-base hidden lg:block">
                  {navItem.name}
                </li>
              </div>
            </NavLink>
          ))}
        </ul>
      </div>
    )
  );
};

export default NavigationBar;
