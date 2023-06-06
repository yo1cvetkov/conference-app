import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Events from "./pages/Events/Events.jsx";
import MyEvents from "./pages/MyEvents/MyEvents.jsx";
import Users from "./pages/Users/Users.jsx";
import RootLayout from "./layout/RootLayout";
import SingleConference from "./pages/SingleConference/SingleConference.jsx";

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
        path: "/conference/:id",
        element: <SingleConference />,
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
