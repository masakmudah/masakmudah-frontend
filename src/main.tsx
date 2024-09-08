import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootRoute } from "./routes/root";
import { HomeRoute, loader as homeLoader } from "./routes/home";
import { LoginRoute } from "./routes/login";
import { RegisterRoute } from "./routes/register";
import { DashboardRoute, loader as dashboardLoader } from "./routes/dashboard";
import { RecipesRoute, loader as recipesLoader } from "./routes/recipes";
import { EditProfileRoute } from "./routes/edit-profile";
import ErrorPage from "./routes/error-page";
import {
  RecipesDetails,
  loader as recipeDetailsLoader,
} from "./routes/recipes-details";
import RecipeNotFound from "./routes/recipe-not-found";
import AuthProvider from "./context/auth-provider";
import { AboutRoute } from "./routes/about";
import {
  NewRecipeRoute,
  loader as newRecipeLoader,
  // action as newRecipeAction,
} from "./routes/new-recipe";
import { UploadRoute } from "./routes/upload";
import {
  UserRecipesRoute,
  loader as userRecipesLoader,
} from "./routes/user-recipes";

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
        path: "/upload",
        element: <UploadRoute />,
      },
      {
        path: "/register",
        element: <RegisterRoute />,
      },
      {
        path: "/dashboard",
        element: <DashboardRoute />,
        loader: dashboardLoader,
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
        path: "/about",
        element: <AboutRoute />,
      },
      {
        path: "/recipes/new",
        element: <NewRecipeRoute />,
        loader: newRecipeLoader,
        // action: newRecipeAction,
      },
      {
        path: "/:username",
        element: <UserRecipesRoute />,
        loader: ({ params }) =>
          userRecipesLoader(params.username || "unknownid"),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
