import CheckOutSteps from "@/components/checkOutSteps/checkOutSteps";
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
import { setisCompany } from "@/redux/features/userSlice";
import { createCompany } from "@/schemas/createCompany/createCompany";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(createCompany),
    mode: "onChange",
    defaultValues: {
      companyName: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;
  console.log("🚀 ~ CompanyCreate ~ errors:", errors);
  const onFinish = (values) => {
    dispatch(setisCompany(values));
    toast.success("Başarıyla kaydedildi");
    navigate("/recruiter/companies/companyDetails");
  };
  return (
    <div className="max-w-6xl mx-auto  w-full mt-12">
      <CheckOutSteps currentStep={1} />
      <div>
        <h1 className="font-bold text-2xl">Senin şirket ismin ve markan</h1>
        <p className="text-muted-foreground">Şirket ismini belirle</p>
      </div>

      <Form {...form}>
        <form onSubmit={handleSubmit(onFinish)}>
          <div>
            <FormField
              control={control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şirket ismi</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="my-2 w-full"
                      placeholder="Microsoft etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
          </div>
          <div className="flex items-center gap-2 my-5">
            <Button
              variant={"outline"}
              onClick={() => navigate("/recruiter/dashboard")}
            >
              İptal
            </Button>
            <Button type="submit">İlerle</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CompanyCreate;
