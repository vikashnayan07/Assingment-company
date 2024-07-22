import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./pages/username";
import Password from "./pages/password";
import SearchPage from "./pages/searchPage";
import ListsPage from "./pages/listsPage";
import Signup from "./pages/signup";

const router = createBrowserRouter([
  { path: "/", element: <Username /> },
  { path: "/password", element: <Password /> },
  { path: "/searchpage", element: <SearchPage /> },
  { path: "/lists", element: <ListsPage /> },
  { path: "/signup", element: <Signup /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
