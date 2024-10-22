import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createCompany } from "@/schemas/createCompany/createCompany";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { locationTypes } from "@/lib/utils";
import LocationInput from "@/components/locationInput/locationInput";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import CheckOutSteps from "@/components/checkOutSteps/checkOutSteps";
import { useCompanyCreateMutation } from "@/redux/api/companyApi";
import { useEffect } from "react";
import LoadingButton from "@/components/ui/loadingButton";
import { useNavigate } from "react-router-dom";

const CompanyDetails = () => {
  const { company } = useSelector((state) => state.auth);
  const [companyCreate, { isSuccess, isError, error, isLoading }] =
    useCompanyCreateMutation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(createCompany),
    mode: "onChange",
    defaultValues: {
      description: "",
      location: "",
      website: "",
      locationType: "",
      logo: "",
    },
  });
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("logo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Başarıyla oluşturuldu");
      navigate("/recruiter/dashboard");
    }
    if (isError) {
      console.log(error);
      toast.error(error?.data?.message || error?.data?.errors[0]?.message);
    }
  }, [isError, isSuccess, error]);

  const { handleSubmit, control, watch, setValue } = form;
  const onFinish = async (values) => {
    await companyCreate({ ...values, companyName: company.companyName });
  };
  return (
    <div className="max-w-6xl mx-auto mt-12">
      <CheckOutSteps currentStep={2} />
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onFinish)}>
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket açıklaması</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Web sitesi</FormLabel>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="locationType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konum Tipi</FormLabel>{" "}
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full border border-gray-200 rounded-md p-2">
                        <SelectValue placeholder="konum tipini seçiniz" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {locationTypes.map((item, index) => (
                            <SelectItem key={index} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konum</FormLabel>
                    <FormControl>
                      <div>
                        {" "}
                        <LocationInput onLocationSelected={field.onChange} />
                        {watch("location") && (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                setValue("location", "", {
                                  shouldValidate: true,
                                })
                              }
                            >
                              <X size={20} />
                            </button>
                            <span className="text-sm">{watch("location")}</span>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2 pt-4">
                <FormField
                  control={control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Logo</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 my-5">
              {isLoading ? (
                <LoadingButton className={"w-44 my-0"}>
                  Lütfen Bekleyin
                </LoadingButton>
              ) : (
                <Button type="submit" className={"w-44"}>
                  Kaydet
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CompanyDetails;
