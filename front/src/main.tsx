import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages";
import UpdateSecondary from "./pages/secondary/update";
import Update from "./pages/update";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/:id",
    element: <Update />,
  },
  {
    path: "/secondary/:id",
    element: <UpdateSecondary />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <header>
      <nav>
        <ul>
          <li>
            <a href="/">Página inicial</a>
          </li>
        </ul>
      </nav>
    </header>
    <RouterProvider router={router} />
  </React.StrictMode>
);
