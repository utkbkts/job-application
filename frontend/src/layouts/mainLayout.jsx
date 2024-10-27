/* eslint-disable no-unused-vars */
import Header from "@/components/header/header";
import { Outlet } from "react-router-dom";
import { useGetUserQuery } from "../redux/api/userApi";

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
