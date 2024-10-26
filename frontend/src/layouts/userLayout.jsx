import Header from "@/components/header/header";
import UserSidebar from "@/pages/profile/sidebar/sidebar";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div>
        <Header />
        <div className="flex h-full">
          <div className="w-32 min-h-screen">
            <UserSidebar />
          </div>
          <div className="w-full flex-grow min-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
