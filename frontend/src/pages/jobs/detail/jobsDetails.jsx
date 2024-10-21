import Markdown from "@/components/markdown/markDown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormatDate } from "@/helpers/formatDate";
import { useApplyMutation } from "@/redux/api/applicationApi";
import { useGetJobByIdQuery } from "@/redux/api/jobsApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const JobsDetails = () => {
  const { id } = useParams();
  const { data } = useGetJobByIdQuery({ id });
  const [applyMutation, { isError, isSuccess, error }] = useApplyMutation();
  const { user } = useSelector((state) => state.auth);
  const isApplies = data?.job?.applications?.some(
    (application) => application?.applicant?._id === user?._id || false
  );

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Başvuru başarılı");
    }
  }, [error, isSuccess, isError]);

  const handleClick = async () => {
    await applyMutation({ id });
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-8 bg-white shadow-xl rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-extrabold text-4xl text-gray-900">
            {data?.job?.title}
          </h1>
          <div className="pt-4 flex space-x-4">
            <Badge
              className="bg-blue-100 text-blue-700 font-bold py-2 px-4 rounded-md"
              variant="ghost"
            >
              {data?.job?.position}
            </Badge>
            <Badge
              className="bg-red-100 text-red-700 font-bold py-2 px-4 rounded-md"
              variant="ghost"
            >
              {data?.job?.jobType}
            </Badge>
          </div>
        </div>
        <Button
          disabled={isApplies}
          onClick={isApplies ? null : handleClick}
          className={`${
            isApplies
              ? "opacity-50 cursor-not-allowed bg-gray-300"
              : "bg-blue-600 hover:bg-blue-700"
          } text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300 ease-in-out`}
        >
          {isApplies ? "Başvuruldu" : "Şimdi Başvur"}
        </Button>
      </div>

      <h2 className="border-b-2 border-gray-300 font-semibold text-2xl mb-6 pb-4 text-gray-800">
        İş Detayları
      </h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">
            Pozisyon:
          </h3>
          <p className="text-lg text-gray-600">{data?.job?.position}</p>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">Konum:</h3>
          <p className="text-lg text-gray-600">{data?.job?.location}</p>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">Deneyim:</h3>
          <p className="text-lg text-gray-600">{data?.job?.experience}+ Yıl</p>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">Seviye:</h3>
          <p className="text-lg text-gray-600">{data?.job?.experienceLevel}</p>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">Maaş:</h3>
          <p className="text-lg text-gray-600">{data?.job?.salary}</p>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">
            Başvuru Sayısı:
          </h3>
          <div className="flex items-center pl-4">
            {data?.job?.applications?.map((item) => (
              <img
                src={item?.applicant?.avatar?.url}
                key={item.id}
                className="rounded-full h-8 w-8 -m-2"
              />
            ))}
            <span className="pl-4">
              +{data?.job?.applications?.length} başvuranlar
            </span>
          </div>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">Tarih:</h3>
          <p className="text-lg text-gray-600">
            {FormatDate(data?.job?.updatedAt)}
          </p>
        </div>
        <div className="flex items-center">
          <h3 className="font-semibold text-xl w-40 text-gray-800">
            Açıklama:
          </h3>
          <Markdown>{data?.job?.description}</Markdown>
        </div>
      </div>
    </div>
  );
};

export default JobsDetails;
