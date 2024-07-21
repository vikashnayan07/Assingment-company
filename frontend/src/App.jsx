import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./pages/username";
import Password from "./pages/password";
import Seachpages from "./pages/seachpages";
import Signup from "./pages/signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/searchpage",
    element: <Seachpages />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
