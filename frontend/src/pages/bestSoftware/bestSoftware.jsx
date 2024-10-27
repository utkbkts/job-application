import { Button } from "@/components/ui/button";
import { FormatDate } from "@/helpers/formatDate";
import {
  useDeleteProjectsMutation,
  useProjectsAllQuery,
} from "@/redux/api/projectApi";
import { Badge, Calendar, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Loading from "@/components/loading/loading";

const BestSoftware = () => {
  const { data, isLoading } = useProjectsAllQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const [deleteProject, { error, isError, isSuccess }] =
    useDeleteProjectsMutation();
  const prevImageState = () => {
    if (data?.project?.image && data?.project?.image.length > 0) {
      const firstSlide = currentIndex === 0;
      const newIndex = firstSlide
        ? data?.project?.image.length - 1
        : currentIndex - 1;
      setCurrentIndex(newIndex);
    }
  };

  const nextImageState = () => {
    if (data?.project?.image && data?.project?.image.length > 0) {
      const isLastSlide = currentIndex === data?.project?.image.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Başarılı bir şekilde silindi");
    }
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [error, isError, isSuccess]);

  const handleDelete = async (id) => {
    await deleteProject({ id });
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 p-4">
      {data?.project?.map((developer) => (
        <div
          key={developer._id}
          className="w-full h-full relative rounded-lg border border-gray-200 shadow-md bg-white p-4 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Üst kısım: Kullanıcı Bilgileri */}
          <div className="flex items-center  mb-4">
            <img
              src={developer.user.avatar.url}
              alt={`${developer.name}'s Profile`}
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />

            <div className="flex items-center justify-between w-full">
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {developer.user.fullname}
                </h2>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={16} className="mr-1" />
                  {FormatDate(developer.createdAt)}
                </div>
              </div>
              <div>
                {developer?.user?._id === user?._id && (
                  <div>
                    <Button onClick={() => handleDelete(developer?._id)}>
                      <Trash />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Proje Görseli */}
          <div className=" w-full">
            <img
              src={developer.image[currentIndex].url}
              alt={`${developer.projectTitle}`}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <div
              onClick={prevImageState}
              className="absolute left-0 top-1/3 bg-black/80 cursor-pointer"
            >
              <MdArrowLeft size={40} className="text-white" />
            </div>
            <div
              onClick={nextImageState}
              className="absolute right-0 top-1/3 bg-black/80 cursor-pointer"
            >
              <MdArrowRight size={40} className="text-white" />
            </div>
          </div>
          {/* Proje Başlık ve Açıklama */}
          <div>
            <h3 className="text-xl font-bold text-gray-800">
              {developer.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm">
              {developer.description.slice(0, 50)}
            </p>
          </div>

          {/* Kategori ve Etiket */}
          <div className="flex items-center justify-between mt-4">
            <Badge className="bg-purple-50 text-purple-600 px-3 py-1 rounded-lg">
              {developer.category}
            </Badge>
            <Link to={`/bestProject/detail/${developer?._id}`}>
              <button className="text-purple-600 font-semibold hover:underline">
                Detayları Gör
              </button>
            </Link>
          </div>
          <div className="mt-6">
            <Link to={developer.githubLink} target="_blank">
              <Button>Github</Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BestSoftware;
