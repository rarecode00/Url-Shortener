import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/app-layout";
import Dashboard from "./pages/dashboard";
import AuthPage from "./pages/auth";
import LinkPage from "./pages/link";
import RedirectPage from "./pages/redirect";
import LandingPage from "./pages/landing-page";
import UserContext from "./context/context";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/link/:id",
        element: <LinkPage />,
      },
      {
        path: "/:id",
        element: <RedirectPage />,
      },
    ],
  },
]);

function App() {
  return (
    <UserContext>
      <RouterProvider router={router} />
    </UserContext>
  );
}

export default App;
