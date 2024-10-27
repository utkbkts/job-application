/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { useGetUserQuery } from "@/redux/api/userApi";

const inputFields = [
  {
    id: 1,
    type: "text",
    placeholder: "Tam isminizi giriniz",
    name: "fullname",
    label: "isim ve soyad",
  },
  {
    id: 2,
    type: "email",
    placeholder: "Email adresinizi giriniz",
    name: "email",
    label: "email",
  },
  {
    id: 3,
    type: "number",
    placeholder: "Başına 0 ekleyerek giriniz.",
    name: "phoneNumber",
    label: "Telefon numaranız",
  },
  {
    id: 4,
    type: "password",
    placeholder: "Şifrenizi giriniz",
    name: "password",
    label: "şifre",
  },
  {
    id: 5,
    type: "password",
    placeholder: "Şifrenizi tekrar giriniz",
    name: "confirmPassword",
    label: "şifre tekrarı",
  },
  {
    id: 6,
    name: "userType",
    label: "durumunuzu seçiniz",
  },
  {
    id: 7,
    name: "avatar",
    label: "profil resmi",
  },
];

const Register = () => {
  const [formState, setFormState] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    userType: "",
    avatar: "",
  });
  const navigate = useNavigate();
  const [registerCreate, { isLoading, isError, isSuccess, error }] =
    useRegisterMutation();
  const { data } = useGetUserQuery();

  const [imagePreview, setImagePreview] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Kayıt Başarılı", {
        description: "Tebrikler başarılı bir şekilde kayıt oldunuz.",
      });
      navigate("/login");
      navigate(0);
    }
    if (isError) {
      const errorMessage =
        error?.data?.errors?.[0]?.message ||
        error?.data?.message ||
        "Bilinmeyen bir hata oluştu.";

      toast.error("Kayıt başarısız!", {
        description: errorMessage,
      });
      console.log(error);
    }
  }, [isError, isSuccess, error, navigate]);
  //input
  const changeEventHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  //images
  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    const maxSize = 2 * 1024 * 1024;
    reader.onload = () => {
      if (file.size > maxSize) {
        return toast.error("2MB altında bir resim seçiniz.");
      }
      setFormState((prevState) => ({
        ...prevState,
        avatar: reader.result,
      }));
      setImagePreview([reader.result]);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerCreate(formState);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-start gap-2 border border-gray-600 p-4 w-[700px]">
        <h1 className="font-bold text-xl ">Hesap Oluştur</h1>
        <Separator className="mb-2" />
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col gap-4">
            {inputFields.map((item) => {
              return item.name === "userType" ? (
                <div key={item.id}>
                  <Label>{item.label}</Label>
                  <RadioGroup
                    onChange={changeEventHandler}
                    name={item.name}
                    className="flex items-center space-x-2 pt-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="işarayan"
                        id="r1"
                        name="userType"
                      />
                      <Label htmlFor="r1">İş arayan</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="işveren" id="r2" name="userType" />
                      <Label htmlFor="r2">İş veren</Label>
                    </div>
                  </RadioGroup>
                </div>
              ) : item.name === "avatar" ? (
                <div key={item.id}>
                  <Label>{item.label}</Label>
                  <Input
                    onChange={changeFileHandler}
                    id="picture"
                    accept="image/*"
                    type="file"
                    className="cursor-pointer"
                  />
                  {imagePreview && formState.avatar && (
                    <img
                      src={imagePreview}
                      className="w-24 h-24 object-cover rounded-full pt-4"
                    />
                  )}
                </div>
              ) : (
                <div key={item.id}>
                  <Label>{item.label}</Label>
                  <Input
                    onChange={changeEventHandler}
                    value={formState[item.name]}
                    placeholder={item.placeholder}
                    type={item.type}
                    name={item.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="pt-4">
            <Button loading={isLoading} disabled={isLoading} type="submit">
              {isLoading ? "Kayıt olunuyor..." : "kayıt ol"}
            </Button>
          </div>
          <div className="pt-3">
            <span>
              Hesabın var mı?{" "}
              <Link to={"/login"} className="text-blue-600 underline">
                Giriş yap
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
