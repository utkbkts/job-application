import NotFound from "@/components/notFound/notFound";
import MainLayout from "@/layouts/mainLayout";
import Login from "@/pages/auth/login/login";
import Register from "@/pages/auth/register/register";
import BestSoftware from "@/pages/bestSoftware/bestSoftware";
import BestSoftwareDetails from "@/pages/bestSoftware/details/bestSoftwareDetails";
import Company from "@/pages/companies/company";
import HomePage from "@/pages/home/homePage";
import JobsDetails from "@/pages/jobs/detail/jobsDetails";
import Jobs from "@/pages/jobs/jobs";

export const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  errorElement: <NotFound />,
  children: [
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/jobs",
      element: <Jobs />,
    },
    {
      path: "/jobs/details/:id",
      element: <JobsDetails />,
    },
    {
      path: "/companies",
      element: <Company />,
    },
    {
      path: "/bestSoftware",
      element: <BestSoftware />,
    },
    {
      path: "/bestProject/detail/:id",
      element: <BestSoftwareDetails />,
    },
  ],
};
