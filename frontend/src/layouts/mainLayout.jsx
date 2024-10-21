import Header from "@/components/header/header";
import Loading from "@/components/loading/loading";
import { useGetUserQuery } from "@/redux/api/userApi";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const { isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }
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
