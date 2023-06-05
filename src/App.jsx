import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events from "./pages/Events/Events.jsx";
import MyEvents from "./pages/MyEvents/MyEvents.jsx";
import Users from "./pages/Users/Users.jsx";
import SinglePage from "./pages/SinglePage/SinglePage";
import RootLayout from "./layout/RootLayout";
import SimplePage from "./pages/SinglePage/SimplePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Events />,
      },
      {
        path: "/my-events/:id",
        element: <MyEvents />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/conference",
        children: [
          {
            path: "/conference/:id",
            element: <SimplePage />,
          },
        ],
      },
    ],
  },
]);

function App({ children }) {
  return (
    <>
      <RouterProvider router={router}>{children}</RouterProvider>
    </>
  );
}

export default App;
