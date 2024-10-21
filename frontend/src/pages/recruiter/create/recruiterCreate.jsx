import LocationInput from "@/components/locationInput/locationInput";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { jobTypes, locationTypes } from "@/lib/utils";
import createSchema from "@/schemas/createSchema/createSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X } from "lucide-react";
import RichTextEditor from "@/components/richTextEditor/richTextEditor";
import { Label } from "@/components/ui/label";
import { draftToMarkdown } from "markdown-draft-js";
const RecruiterCreate = () => {
  const form = useForm({
    resolver: zodResolver(createSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      jobType: "",
      companyName: "",
      location: "",
      companyLogo: "",
      description: "",
      applicationEmail: "",
      locationType: "",
      applicationUrl: "",
      salary: "",
      requirements: [],
    },
  });

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { isSubmitting, errors },
  } = form;
  console.log("🚀 ~ RecruiterCreate ~ errors:", errors);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("companyLogo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (values) => {
    console.log("Form değerleri:", values);
    console.log("Hata mesajları:", form.formState.errors);
  };

  return (
    <div className="p-8">
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl text-center pt-12">
          İşin için en iyi yazılımcıyı bul
        </h1>
        <span className="text-muted-foreground text-center pt-4">
          Olumlu veya olumsuz geri dönmeyi unutma !!
        </span>
      </div>

      {/* Form Bileşeni */}
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-gray-400 p-4 mt-8"
        >
          <h4 className="font-bold">İş detayları</h4>
          <span className="text-muted-foreground text-center">
            Açıklama ve başlıklar
          </span>
          <Separator />

          <div className="pt-8">
            {/* İş Başlığı */}
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İş başlığı</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* İş Tipi */}
            <div className="flex flex-col gap-2 pt-4">
              <FormField
                control={control}
                name="jobType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İş Tipi</FormLabel>{" "}
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full border border-gray-200 rounded-md p-2">
                        <SelectValue placeholder="İş tipini seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {jobTypes.map((item, index) => (
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
            </div>
            {/* konum Tipi */}
            <div className="flex flex-col gap-2 pt-4">
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
            </div>
            {/* Şirket İsmi */}
            <div className="flex flex-col gap-2 pt-4">
              <FormField
                control={control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket ismi</FormLabel>
                    <FormControl>
                      <Input placeholder="Şirket Adı" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Şirket Logosu */}
            <div className="flex flex-col gap-2 pt-4">
              <Input type="file" accept="image/" onChange={handleImageChange} />
            </div>

            {/* Konum */}
            <div className="flex flex-col gap-2 pt-4">
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
            </div>

            {/* email or url */}
            <div className="flex items-center justify-between w-full gap-2 pt-4">
              <div className="w-full">
                <FormField
                  control={control}
                  name="applicationEmail"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="email" {...field} />
                      </FormControl>
                      <div style={{ minHeight: "1.5rem" }}>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <span>or</span>
              <div className="w-full">
                <FormField
                  control={control}
                  name="applicationUrl"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Url</FormLabel>
                      <FormControl>
                        <Input
                          type="url"
                          placeholder="url"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            trigger("applicationEmail");
                          }}
                        />
                      </FormControl>
                      <div style={{ minHeight: "1.5rem" }}>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div>
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <RichTextEditor
                        onChange={(draft) => {
                          const markdown = draftToMarkdown(draft);
                          setValue("description", markdown);
                        }}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={"20.000-50.000"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <FormField
              control={control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gereksinimler örn:HTML,CSS</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={", ile ayırın HTML,CSS"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <FormField
              control={control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kaç yıl deneyim aradığınızı giriniz.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={"Kaç yıl deneyim aradığınızı giriniz."}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-4">
            <FormField
              control={control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Seviye giriniz.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder={"junior,mid-level,senior"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 rounded-md"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Gönderiliyor..." : "Gönder"}
          </button>
        </form>
      </Form>
    </div>
  );
};

export default RecruiterCreate;
