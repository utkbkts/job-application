import NotFound from "@/components/notFound/notFound";
import UserLayout from "@/layouts/userLayout";
import { UserLoader } from "@/loaders/userLoaders";
import ProfileDashboard from "@/pages/profile/dashboard/profileDashboard";

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
  ],
};
