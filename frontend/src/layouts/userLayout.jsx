import Header from "@/components/header/header";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div>
        <Header />
        <div className="min-h-screen w-full flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
