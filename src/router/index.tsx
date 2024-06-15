import { RouteObject, useRoutes, Navigate } from "react-router-dom";
import ROUTES from "./routes";
import { Login, Dashboard, Layout, Error, AddUser, UserList } from "@/pages";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const RouterComponent = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  const routes: RouteObject[] = [
    {
      index: true,
      path: "/",
      element: <Navigate to={ROUTES.login} />,
    },
    {
      index: true,
      path: ROUTES.login,
      element: <Login isAuthenticated={isLoggedIn} />,
    },
    {
      path: ROUTES.dashboard,
      element: <Layout isAuthenticated={isLoggedIn} />,
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: ROUTES.user_add,
          element: <AddUser />,
        },
        {
          path: ROUTES.user_list,
          element: <UserList />,
        },
      ],
    },
    {
      path: "*",
      element: <Error />,
    },
  ];

  const element = useRoutes(routes);
  return element;
};

export default RouterComponent;
