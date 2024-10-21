import Header from "@/components/header/header";
import SidebarAside from "@/pages/recruiter/sidebar/sidebar";
import { Outlet } from "react-router-dom";

const RecruiterLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <Header />
      <div className="flex h-full">
        <div className="w-32 min-h-screen">
          <SidebarAside />
        </div>
        <div className="w-full flex-grow min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default RecruiterLayout;
