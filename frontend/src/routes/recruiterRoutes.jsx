import NotFound from "@/components/notFound/notFound";
import RecruiterLayout from "@/layouts/recruiterLayout";
import { RecruiterLoaders } from "@/loaders/recruiterLoaders";
import CompanyCreate from "@/pages/recruiter/companyCreate/companyCreate";
import CompanyDetails from "@/pages/recruiter/companyCreate/partials/companyDetails";
import RecruiterCreate from "@/pages/recruiter/create/recruiterCreate";
import RecruiterDashboard from "@/pages/recruiter/dashboard/recruiterDashboard";

export const RecruiterRoutes = {
  path: "/recruiter",
  element: <RecruiterLayout />,
  errorElement: <NotFound />,
  loader: () => RecruiterLoaders("işveren"),
  children: [
    {
      path: "dashboard",
      element: <RecruiterDashboard />,
    },
    {
      path: "create",
      element: <RecruiterCreate />,
    },
    {
      path: "companies/create",
      element: <CompanyCreate />,
    },
    {
      path: "companies/companyDetails",
      element: <CompanyDetails />,
    },
  ],
};
