/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from "react";
import NotFound from "@/components/notFound/notFound";
const RecruiterLayout = React.lazy(() => import("@/layouts/recruiterLayout"));
const RecruiterDashboard = React.lazy(() =>
  import("@/pages/recruiter/dashboard/recruiterDashboard")
);
const RecruiterCreate = React.lazy(() =>
  import("@/pages/recruiter/create/recruiterCreate")
);
const CompanyCreate = React.lazy(() =>
  import("@/pages/recruiter/companyCreate/companyCreate")
);
const CompanyDetails = React.lazy(() =>
  import("@/pages/recruiter/companyCreate/partials/companyDetails")
);
const MyAds = React.lazy(() => import("@/pages/recruiter/myAds/myAds"));
import { RecruiterLoaders } from "@/loaders/recruiterLoaders";
import Loading from "@/components/loading/loading";

export const RecruiterRoutes = {
  path: "/recruiter",
  element: (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <RecruiterLayout />
    </Suspense>
  ),
  errorElement: <NotFound />,
  loader: () => RecruiterLoaders("işveren"),
  children: [
    {
      path: "dashboard",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <RecruiterDashboard />
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
          <RecruiterCreate />
        </Suspense>
      ),
    },
    {
      path: "companies/create",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <CompanyCreate />
        </Suspense>
      ),
    },
    {
      path: "companies/companyDetails",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <CompanyDetails />
        </Suspense>
      ),
    },
    {
      path: "applicant",
      element: (
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <MyAds />
        </Suspense>
      ),
    },
  ],
};
