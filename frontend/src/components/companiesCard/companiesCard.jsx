import { Badge, Bookmark, MapPinned } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const CompaniesCard = ({ job }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full rounded-lg border border-gray-200 shadow-lg bg-white transition-transform transform hover:-translate-y-1 hover:shadow-2xl">
      <div className="p-6 w-full">
        <div className="flex items-center justify-between pb-4">
          <h1 className="font-bold text-lg text-gray-900">{job?.title}</h1>
          <span className="cursor-pointer text-gray-500 hover:text-gray-900">
            <Bookmark size={20} />
          </span>
        </div>
        <h2 className="text-xl font-bold text-purple-700 mb-2">
          {job?.companyName}
        </h2>
        <div className="flex items-start gap-4">
          <img
            src={job?.logo?.url}
            alt="Company Logo"
            className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm"
          />
          <div className="flex flex-col justify-start">
            <span className="text-gray-700 font-semibold">
              {job?.company?.name}
            </span>
            <span className="flex items-center text-gray-500 text-sm gap-1 mt-1">
              <MapPinned size={16} color="rgba(197,153,229,1)" />
              {job?.location}
            </span>
          </div>
        </div>
        <div className="pt-4 flex gap-2">
          <Badge className="text-purple-600 font-semibold bg-purple-50 border border-purple-100 px-3 py-1 rounded-full"></Badge>
          <Badge className="text-red-600 font-semibold bg-red-50 border border-red-100 px-3 py-1 rounded-full"></Badge>
        </div>
        <div>iş şekli: {job?.locationType}</div>
        <div>pozisyon: {job?.description}</div>
        <div className="mt-4 text-sm text-gray-500">
          <span>Website: {job?.website?.slice(0, 30)}</span>
        </div>
        <div className="pt-6">
          <Button
            onClick={() => navigate(`/jobs/details/${job?._id}`)}
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Detayları Gör
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompaniesCard;
