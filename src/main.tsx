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
import { EditProfileRoute } from "./routes/edit-profile";

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
        path: "/:accounts.username",
        element: <DashboardRoute />,
      },
      {
        path: "/accounts/edit",
        element: <EditProfileRoute />,
      },
      {
        path: "/recipes",
        element: <RecipesRoute />,
      },
      {
        path: "/recipes/:slug",
        element: <RecipeRoute />,
      },
      {
        path: "/recipes/new",
        element: <NewRecipeRoute />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginRoute />,
  },
  {
    path: "/register",
    element: <RegisterRoute />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
