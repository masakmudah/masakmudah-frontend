import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRoute } from "./routes/root";
import { HomeRoute, loader as homeLoader } from "./routes/home";
import { LoginRoute } from "./routes/login";
import { RegisterRoute } from "./routes/register";
import { RecipeRoute } from "./routes/recipe";
import { DashboardRoute } from "./routes/dashboard";
import { NewRecipeRoute } from "./routes/new-recipe";
import { RecipesRoute, loader as recipesLoader } from "./routes/recipes";
import { EditProfileRoute } from "./routes/edit-profile";
import ErrorPage from "./routes/error-page";
import {
  RecipesDetails,
  loader as recipeDetailsLoader,
} from "./routes/recipes-details";
import RecipeNotFound from "./routes/recipe-not-found";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeRoute />,
        loader: homeLoader,
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
        path: "/editprofile",
        element: <EditProfileRoute />,
      },
      {
        path: "/recipes",
        element: <RecipesRoute />,
        loader: recipesLoader,
      },
      {
        path: "/recipes/:recipesId",
        element: <RecipesDetails />,
        loader: ({ params }) =>
          recipeDetailsLoader(params.recipesId || "unknownid"),
        errorElement: <RecipeNotFound />,
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
