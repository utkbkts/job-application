import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApplyMutation } from "@/redux/api/applicationApi";
import { Bookmark, MapPinned } from "lucide-react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";

const JobsCard = ({ job }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [applyMutation, { isError, isSuccess, error }] = useApplyMutation();
  const isApplies = job?.applications?.some(
    (application) => application?.applicant?._id === user?._id || false
  );
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Başvuru başarılı");
      navigate(0);
    }
  }, [error, isSuccess, isError]);
  const handleClick = async (id) => {
    await applyMutation({ id });
  };

  return (
    <div className="w-full h-full rounded-md border border-gray-400">
      <div className="p-2 w-full">
        <div className="flex items-center justify-between pb-4">
          <h1 className="font-bold">{job?.title}</h1>
          <span>
            <Bookmark />
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-purple-500 py-1 text-white px-1 rounded-md">
            {job?.jobType}
          </span>
          <span>maaş: {job?.salary}₺</span>
        </div>
        <div className="flex pt-4 items-center">
          <img src={job?.companyLogo?.url} alt="" className="w-12 h-12" />
          <div className="flex items-start gap-2 flex-col">
            <span>{job?.company?.name}</span>
            <span className="flex items-center gap-2">
              <MapPinned color="rgba(197,153,229,1)" />
              {job?.location}
            </span>
          </div>
        </div>
        <div className="p-2 flex items-center gap-2">
          Toplam oy:
          <StarRatings
            rating={parseFloat(job?.ratings)}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="ratings"
            starDimension="14px"
            starSpacing="1px"
          />
        </div>
        <div className="flex items-center pt-12 pl-4">
          {job?.applications?.map((item) => (
            <img
              src={item?.applicant?.avatar?.url}
              key={item._id}
              className="rounded-full h-8 w-8 -m-2"
            />
          ))}
          <span className="pl-4">+{job?.applications?.length} başvuranlar</span>
        </div>

        <div className="pt-4">
          <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            {job?.experience}
          </Badge>{" "}
          <Badge className={"text-red-700 font-bold"} variant={"ghost"}>
            {job?.jobType}
          </Badge>
          <Badge className={"text-yellow-700 font-bold"} variant={"ghost"}>
            {job?.experienceLevel}+Deneyim
          </Badge>
        </div>
        <div className="pt-4 flex items-center gap-2">
          <Button
            onClick={() => navigate(`/jobs/details/${job?._id}`)}
            className="border border-gray-600 bg-transparent text-black hover:bg-transparent"
          >
            Detay
          </Button>
          <Button
            onClick={() => handleClick(job?._id)}
            disabled={isApplies}
            className="bg-purple-500 hover:bg-purple-600"
          >
            {isApplies ? "Başvuruldu" : " Şimdi Başvur"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
