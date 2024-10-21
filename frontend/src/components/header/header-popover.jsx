import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "@/redux/api/authApi";

const HeaderPopover = () => {
  const { user } = useSelector((state) => state.auth);
  const [logoutMutation] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logoutMutation();
    navigate("/");
    navigate(0);
  };
  return (
    <>
      {!user ? (
        <div className="flex items-center gap-2">
          <Link to={"/login"}>
            <Button variant={"secondary"} className=" hover:bg-gray-400">
              Login
            </Button>
          </Link>
          <Link to={"/register"}>
            <Button className="bg-blue-500 hover:bg-blue-700">Sign Up</Button>
          </Link>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger className="cursor-pointer" asChild>
            <Avatar>
              <AvatarImage src={user?.avatar?.url} />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <div className="flex gap-4 space-y-2">
              <Avatar>
                <AvatarImage src={user?.avatar?.url} />
              </Avatar>
              <div>
                <h4 className="font-medium">{user?.fullname}</h4>
                <h4 className="text-sm text-muted-foreground">{user?.email}</h4>
                <p className="text-sm text-muted-foreground">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </p>
              </div>
            </div>
            <Separator />
            <div className="flex flex-col gap-2 text-gray-600 pt-4">
              <Link to={"/profile"}>
                <Button className="w-full" variant="secondary">
                  Profil
                </Button>
              </Link>
              {user?.userType === "işveren" && (
                <Link to={"/recruiter/dashboard"}>
                  <Button className="w-full" variant="secondary">
                    İş ekle
                  </Button>
                </Link>
              )}
              <Button variant="destructive" onClick={handleLogout}>
                Çıkış
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </>
  );
};

export default HeaderPopover;
