import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRoute } from "./routes/root";
import { HomeRoute } from "./routes/home";
import { LoginRoute } from "./routes/login";
import { RegisterRoute } from "./routes/register";
import { RecipeRoute } from "./routes/recipe";
import { DashboardRoute } from "./routes/dashboard";
import { NewRecipeRoute } from "./routes/new-recipe";
import { RecipesRoute } from "./routes/recipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
      },
      {
        path: "/login",
        element: <LoginRoute />,
      },
      {
        path: "/register",
        element: <RegisterRoute />,
      },
      {
        path: "/dashboard",
        element: <DashboardRoute />,
      },
      {
        path: "/recipes",
        element: <RecipesRoute />,
      },
      {
        path: "/recipe",
        element: <RecipeRoute />,
      },
      {
        path: "/recipe/new",
        element: <NewRecipeRoute />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
