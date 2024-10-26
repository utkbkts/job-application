import RichTextEditor from "@/components/richTextEditor/richTextEditor";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import UploadImages from "@/components/uploadWidget/uploadWidget";
import {
  useCreateProjectsMutation,
  useProjectByIdQuery,
  useUpdateProjectsMutation,
} from "@/redux/api/projectApi";
import { profileSchema } from "@/schemas/profileSchema/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const ProfileCreate = () => {
  const { id } = useParams();
  const [createPost, { isSuccess, isError, error }] =
    useCreateProjectsMutation();
  const { data: projectData } = useProjectByIdQuery({ id });
  const [
    updatePost,
    { isSuccess: updateSuccess, isError: UpdateIsError, error: UpdateError },
  ] = useUpdateProjectsMutation();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      image: [],
      githubLink: "",
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (isSuccess) {
      toast.success("Başarıyla oluşturuldu");
      navigate("/profile/projects");
    } else if (updateSuccess) {
      toast.success("Başarıyla güncellendi");
    }
    if (isError) {
      const errorMessage =
        error?.data?.errors?.[0]?.message ||
        error?.data?.message ||
        "Bilinmeyen bir hata oluştu.";

      toast.error("başarısız!", {
        description: errorMessage,
      });
    } else if (UpdateIsError) {
      const errorMessage =
        UpdateError?.data?.errors?.[0]?.message ||
        UpdateError?.data?.message ||
        "Bilinmeyen bir hata oluştu.";

      toast.error("başarısız!", {
        description: errorMessage,
      });
    }
  }, [isError, isSuccess, error, UpdateError, updateSuccess, UpdateIsError]);

  useEffect(() => {
    if (projectData) {
      setValue("title", projectData.project.title);
      setValue("githubLink", projectData.project.githubLink);
      setValue("description", projectData.project.description);
    }
  }, [projectData, setValue]);

  const handleImageUpload = (imageUrl) => {
    const currentImages = form.getValues("image") || [];
    if (imageUrl && !currentImages.includes(imageUrl)) {
      setValue("image", [...currentImages, imageUrl]);
    }
  };

  const onSubmit = async (values) => {
    try {
      if (id) {
        await updatePost({ id, body: { values } });
        toast.success("Proje güncellendi!");
      } else {
        await createPost(values);
        toast.success("Proje oluşturuldu!");
      }
    } catch (error) {
      toast.error("Bir hata oluştu!", error?.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto min-h-screen border border-gray-400 p-4 mt-8">
      {!id && (
        <div className="flex flex-col">
          <h1 className="font-bold text-3xl text-center pt-12">
            Proje Paylaşırken Dikkat Edilmesi Gerekenler
          </h1>
          <span className="text-muted-foreground text-center pt-4">
            Projelerinizi paylaşırken dikkatli olun.
          </span>
          <p className="text-muted-foreground text-center pt-4">
            Proje paylaşımı, fikirlerinizi ve çalışmalarınızı geniş bir kitleyle
            buluşturmanın harika bir yoludur. Ancak, projelerinizi paylaşmadan
            önce aşağıdaki önemli noktaları göz önünde bulundurmanız
            gerekmektedir:
          </p>
          <ul className="text-muted-foreground text-center pt-4">
            <li>
              ✅ **Olumlu ve Yapıcı Olun:** Projelerinizi sunarken, olumlu bir
              dil kullanmaya özen gösterin. Olumsuz veya eleştirel ifadeler,
              projenizin algısını olumsuz etkileyebilir.
            </li>
            <li>
              ✅ **Detaylı Bilgi Verin:** Projeniz hakkında detaylı bilgi
              sunarak, diğer kullanıcıların projeyi daha iyi anlamasını
              sağlayın. Hedefler, süreçler ve sonuçlar hakkında net bilgiler
              verin.
            </li>
            <li>
              ✅ **Görseller ve Örnekler Kullanın:** Projenizi destekleyen
              görseller ve örnekler eklemek, ilgiyi artırır ve projeye olan
              güveni pekiştirir.
            </li>
            <li>
              ✅ **Hedef Kitlenizi Belirleyin:** Projenizi paylaşırken, kimlere
              hitap ettiğinizi belirlemek, geri dönüşlerinizi daha anlamlı
              kılacaktır.
            </li>
            <li>
              ✅ **Yasal ve Etik Kurallara Uyun:** Paylaşacağınız içeriğin telif
              haklarına, gizlilik politikalarına ve diğer yasal kurallara uygun
              olmasına dikkat edin.
            </li>
          </ul>
          <p className="text-muted-foreground text-center pt-4">
            Unutmayın, proje paylaşımı sadece bir iş değil, aynı zamanda bir
            iletişim biçimidir. Dikkatli ve özenli bir yaklaşım, projenizin
            değerini artıracak ve toplulukla olumlu bir etkileşim kurmanızı
            sağlayacaktır.
          </p>
        </div>
      )}

      <Separator />
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* İş Başlığı */}
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proje Başlığı</FormLabel>
                    <FormControl>
                      <Input placeholder="Chat application" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Proje Açıklaması</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        projectData={projectData}
                        onChange={(value) => {
                          field.onChange(value);
                          setValue("description", value);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name="githubLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Github Linki</FormLabel>
                    <FormControl>
                      <Input type="url" placeholder="githubLink" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-2">
              <FormField
                control={control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>En fazla 3 resim yükleyebilirsin.</FormLabel>
                    <FormControl>
                      <UploadImages onUpload={handleImageUpload} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {projectData?.project?.image?.map((item) => (
                <img
                  key={item?._id}
                  src={item?.url}
                  className="w-32 h-32 object-cover"
                  alt="image"
                />
              ))}
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white p-2 rounded-md w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : id ? "Güncelle" : "Gönder"}
            </button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProfileCreate;
