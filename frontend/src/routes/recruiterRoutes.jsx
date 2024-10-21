import NotFound from "@/components/notFound/notFound";
import RecruiterLayout from "@/layouts/recruiterLayout";
import { RecruiterLoaders } from "@/loaders/recruiterLoaders";
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
  ],
};
