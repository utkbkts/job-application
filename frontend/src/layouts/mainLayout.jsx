/* eslint-disable no-unused-vars */
import Header from "@/components/header/header";
import { useGetUserQuery } from "@/redux/api/userApi";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { data } = useGetUserQuery();
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
