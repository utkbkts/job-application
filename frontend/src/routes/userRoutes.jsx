/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import NotFound from "@/components/notFound/notFound";
const UserLayout = React.lazy(() => import("@/layouts/userLayout"));
const ProfileCreate = React.lazy(() =>
  import("@/pages/profile/create/createProfile")
);
const ProfileDashboard = React.lazy(() =>
  import("@/pages/profile/dashboard/profileDashboard")
);
const MyProjects = React.lazy(() =>
  import("@/pages/profile/myProjects/myProjects")
);
import { UserLoader } from "@/loaders/userLoaders";
import Loading from "@/components/loading/loading";

export const UserRoutes = {
  path: "/profile",
  element: (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <UserLayout />
    </Suspense>
  ),
  errorElement: <NotFound />,
  loader: () => UserLoader(),
  children: [
    {
      path: "",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <ProfileDashboard />
        </Suspense>
      ),
    },
    {
      path: "create",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <ProfileCreate />
        </Suspense>
      ),
    },
    {
      path: "projects",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <MyProjects />
        </Suspense>
      ),
    },
    {
      path: "update/:id",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <ProfileCreate />
        </Suspense>
      ),
    },
  ],
};
