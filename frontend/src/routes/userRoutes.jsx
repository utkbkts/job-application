import NotFound from "@/components/notFound/notFound";
import UserLayout from "@/layouts/userLayout";
import { UserLoader } from "@/loaders/userLoaders";
import ProfileCreate from "@/pages/profile/create/createProfile";
import ProfileDashboard from "@/pages/profile/dashboard/profileDashboard";
import MyProjects from "@/pages/profile/myProjects/myProjects";

export const UserRoutes = {
  path: "/profile",
  element: <UserLayout />,
  errorElement: <NotFound />,
  loader: () => UserLoader(),
  children: [
    {
      path: "",
      element: <ProfileDashboard />,
    },
    {
      path: "create",
      element: <ProfileCreate />,
    },
    {
      path: "projects",
      element: <MyProjects />,
    },
    {
      path: "update/:id",
      element: <ProfileCreate />,
    },
  ],
};
