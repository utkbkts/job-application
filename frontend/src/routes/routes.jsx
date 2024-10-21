import { createBrowserRouter } from "react-router-dom";
import { MainRoutes } from "./mainRoutes";
import { UserRoutes } from "./userRoutes";
import { RecruiterRoutes } from "./recruiterRoutes";

export const router = createBrowserRouter([
  MainRoutes,
  UserRoutes,
  RecruiterRoutes,
]);
