import { Button } from "../ui/Button";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import { RootState } from "@/store";

type HeaderProps = {
  setIsLoggingOut?: any;
};

function Header({ setIsLoggingOut }: HeaderProps) {
  const userData = useSelector((state: RootState) => state.auth.userData);

  const dispatch = useDispatch();
  const handleLogout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      dispatch(logout());
    }, 2000);
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center"></div>
          <div className="flex items-center lg:order-2 gap-4">
            <Button variant={"destructive"} onClick={handleLogout}>
              Logout
            </Button>
            <div className="flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                src={userData.image}
                alt="user photo"
              />
              <p className='cursor-pointer'>{userData.firstName + " " +  userData.lastName}</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
