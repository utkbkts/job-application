/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import { useGetUserQuery } from "@/redux/api/userApi";
import { setUser } from "@/redux/features/userSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { data } = useGetUserQuery();
  const { user } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map((skill) => skill) || "",
    file: user?.profile?.resume || "",
  });
  const dispatch = useDispatch();
  //images
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setInput((prevState) => ({
      ...prevState,
      file: file,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "skills") {
      setInput({
        ...input,
        [name]: value.split(",").map((skill) => skill.trim()),
      });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/api/auth/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[525px]"
          onInteractOutside={() => setOpen(false)}
          aria-describedby={undefined}
        >
          <DialogHeader>
            <DialogTitle>Profil Güncelle</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
              <label htmlFor="fullname" className="text-right">
                Name
              </label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
              <label htmlFor="email" className="text-right">
                Email
              </label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
              <label htmlFor="phoneNumber" className="text-right">
                Telefon
              </label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
              <label htmlFor="bio" className="text-right">
                Bio
              </label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={handleChange}
                className="col-span-3"
              />
            </div>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
              <label htmlFor="skills" className="text-right">
                Beceriler
              </label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={handleChange}
                className="col-span-3"
                placeholder=", ile ayırın."
              />
            </div>
            <div className="grid gap-4 py-4 grid-cols-4 items-center">
              <Label htmlFor="file" className="text-right">
                Öz geçmiş
              </Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
            <DialogFooter>
              {loading ? (
                <LoadingButton>Lütfen Bekleyin</LoadingButton>
              ) : (
                <Button>Güncelle</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
