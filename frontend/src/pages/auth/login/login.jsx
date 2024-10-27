import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useLoginMutation } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useGetUserQuery } from "../../../redux/api/userApi";

const inputFields = [
  {
    id: 2,
    type: "email",
    placeholder: "Email adresinizi giriniz",
    name: "email",
    label: "email",
  },
  {
    id: 4,
    type: "password",
    placeholder: "Şifrenizi giriniz",
    name: "password",
    label: "şifre",
  },
  {
    id: 6,
    name: "userType",
    label: "durumunuzu seçiniz",
  },
];

const Login = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    userType: "",
  });
  const navigate = useNavigate();
  const [LoginCreate, { isLoading, isError, isSuccess, error }] =
    useLoginMutation();
    const {data} = useGetUserQuery()
  useEffect(() => {
    if (isSuccess) {
      toast.success("Giriş Başarılı", {
        description: "Tebrikler başarılı bir şekilde giriş yaptınız.",
      });
      navigate("/");
    }
    if (isError) {
      const errorMessage =
        error?.data?.errors?.[0]?.message ||
        error?.data?.message ||
        "Bilinmeyen bir hata oluştu.";

      toast.error("Giriş başarısız!", {
        description: errorMessage,
      });
      console.log(error);
    }
  }, [isError, isSuccess, error, navigate]);
  //input
  const changeEventHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginCreate(formState);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex flex-col items-start gap-2 border border-gray-600 p-4 w-[700px]">
        <h1 className="font-bold text-xl ">Giriş yap</h1>
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
              {isLoading ? "Giriş yapılıyor..." : "Giriş yap"}
            </Button>
          </div>
          <div className="pt-3">
            <span>
              Hesabın yok mu?{" "}
              <Link to={"/register"} className="text-blue-600 underline">
                Kayıt ol
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
