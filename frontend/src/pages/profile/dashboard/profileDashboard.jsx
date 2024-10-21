import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TablePart from "./partials/table";
import { useState } from "react";
import { Pen } from "lucide-react";
import UpdateProfileDialog from "../updateProfile/updateProfile";
import { useSelector } from "react-redux";

const ProfileDashboard = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-5xl mx-auto mt-24 ">
        <div className="border border-gray-400 p-8">
          <div className="flex justify-between gap-4">
            <div className="flex gap-2">
              <img
                src={user?.avatar?.url}
                className="w-24 h-24 object-cover rounded-xl"
                alt="image"
              />
              <div className="flex flex-col gap-2">
                <h1>{user?.fullname}</h1>
                <p>{user?.profile?.bio}</p>
              </div>
            </div>
            <div>
              <Button variant="link" onClick={() => setOpen(!open)}>
                <Pen />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-1 pt-12">
            <span className="font-normal leading-2">{user?.email}</span>
            <span className="font-normal leading-2">{user?.phoneNumber}</span>
          </div>
          <div className="flex flex-col pt-8">
            <span className="text-[17px] pb-2">Beceriler</span>
            <div className="flex items-center gap-2">
              {user?.profile?.skills?.map((item, index) => (
                <Button key={index}>{item}</Button>
              ))}
            </div>
          </div>
          <div className="pt-8 flex flex-col ">
            <span className="font-bold">Öz geçmiş</span>
            {user?.profile?.resume ? (
              <Link
                target="_blank"
                to={user?.profile?.resume}
                className="text-blue-500 font-light"
              >
                {user?.profile?.resumeOriginalName}
              </Link>
            ) : (
              <span>N/A</span>
            )}
          </div>
        </div>
        <TablePart />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default ProfileDashboard;
