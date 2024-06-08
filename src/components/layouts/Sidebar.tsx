import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import ROUTES from "@/router/routes";

type SidebarProps = {
  setIsLoggingOut?: any;
};

function Sidebar({ setIsLoggingOut }: SidebarProps) {
  const [openSubMenu, setOpenSubMenu] = useState("");

  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      dispatch(logout());
    }, 2000);
  };

  const MenuItem = ({
    name,
    children,
  }: {
    name: string;
    children: React.ReactNode;
  }) => {
    const toggleSubMenu = () => {
      setOpenSubMenu(name === openSubMenu ? "" : name);
    };

    const DropDownIcon = () => {
      return (
        <svg
          className={`w-6 h-6 transition-transform transform ${
            name === openSubMenu ? "rotate-180" : ""
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      );
    };

    return (
      <>
        <li>
          <button
            type="button"
            className="flex items-center p-2 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            onClick={toggleSubMenu}
          >
            <span className="flex-1 ml-3 text-left whitespace-nowrap">
              {name}
            </span>
            <DropDownIcon />
          </button>
          {name === openSubMenu && children}
        </li>
      </>
    );
  };

  const SubMenu = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <ul className="py-2 space-y-2">{children}</ul>
      </>
    );
  };

  const SubMenuItem = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <li>
          <Link
            to={"/"}
            className="flex items-center p-2 pl-11 w-full text-base font-medium text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            {children}
          </Link>
        </li>
      </>
    );
  };

  return (
    <>
      <aside
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidenav"
        id="drawer-navigation"
      >
        <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
          <ul className="space-y-2">
            <MenuItem name={"User Management"}>
              <SubMenu>
                <SubMenuItem>
                  <Link to={ROUTES.user_add}>Add Users</Link>
                </SubMenuItem>
                <SubMenuItem>
                  <Link to={"/user-add"}>List Of Users</Link>
                </SubMenuItem>
              </SubMenu>
            </MenuItem>
            <MenuItem name={"Settings"}>
              <SubMenu>
                <SubMenuItem>Setting1</SubMenuItem>
                <SubMenuItem>Setting2</SubMenuItem>
                <SubMenuItem>Setting3</SubMenuItem>
              </SubMenu>
            </MenuItem>
            <Button
              onClick={handleLogout}
              expand={"full"}
              variant={"destructive"}
            >
              Logout
            </Button>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
