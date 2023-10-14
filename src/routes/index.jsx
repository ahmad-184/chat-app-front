import { Suspense, lazy } from "react";
import {
  Navigate,
  RouterProvider as ReactRouterdProvider,
  createBrowserRouter,
} from "react-router-dom";

// layouts
import DashboardLayout from "../layouts/dashboard";
import AuthLayout from "../layouts/auth";

// config
import { DEFAULT_PATH } from "../config";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);
const Groups = Loadable(lazy(() => import("../pages/dashboard/groups")));
const Calls = Loadable(lazy(() => import("../pages/dashboard/calls")));
const Settings = Loadable(lazy(() => import("../pages/dashboard/settings")));
const Profile = Loadable(lazy(() => import("../pages/dashboard/profile")));
const Page404 = Loadable(lazy(() => import("../pages/Page404")));
const LoginPage = Loadable(lazy(() => import("../pages/auth/login")));
const RegisterPage = Loadable(lazy(() => import("../pages/auth/register")));
const ForgotPasswordPage = Loadable(
  lazy(() => import("../pages/auth/forgot-password"))
);
const ResetPasswordPage = Loadable(
  lazy(() => import("../pages/auth/reset-password"))
);

const routes = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <Navigate to={"/404"} />,
    children: [
      { element: <Navigate to={DEFAULT_PATH} replace />, index: true },
      { path: "app", element: <GeneralApp /> },
      { path: "groups", element: <Groups /> },
      { path: "calls", element: <Calls /> },
      { path: "settings", element: <Settings /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    errorElement: <Navigate to={"/404"} />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "forgot-password", element: <ForgotPasswordPage /> },
      { path: "reset-password", element: <ResetPasswordPage /> },
      { path: "*", element: <Navigate to="/404" replace /> },
    ],
  },
  { path: "*", element: <Navigate to="/404" replace /> },
  { path: "/404", element: <Page404 /> },
]);

export default function RouterProvider() {
  return <ReactRouterdProvider router={routes} />;
}
