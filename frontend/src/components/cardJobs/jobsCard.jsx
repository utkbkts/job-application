import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bookmark, MapPinned } from "lucide-react";
import { useNavigate } from "react-router-dom";

const homeImage = [
  {
    id: 1,
    image: "/home/1.jpg",
  },
  {
    id: 2,
    image: "/home/2.jpg",
  },
  {
    id: 3,
    image: "/home/3.jpg",
  },
  {
    id: 4,
    image: "/home/4.jpg",
  },
  {
    id: 5,
    image: "/home/5.jpg",
  },
];
const JobsCard = ({ job }) => {
  const navigate = useNavigate();
  console.log(job);
  return (
    <div className="w-full h-[400px] rounded-md border border-gray-400">
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
          <span>salary: {job?.salary}</span>
        </div>
        <div className="flex pt-4">
          <img src="/home/apple.png" alt="" className="w-12 h-12" />
          <div className="flex items-start gap-2 flex-col">
            <span>{job?.company?.name}</span>
            <span className="flex items-center gap-2">
              <MapPinned color="rgba(197,153,229,1)" />
              {job?.location}
            </span>
          </div>
        </div>
        <div className="flex items-center pt-12 pl-4">
          {homeImage.map((item) => (
            <img
              src={item.image}
              key={item.id}
              className="rounded-full h-8 w-8 -m-2"
            />
          ))}
          <span className="pl-4">+{job?.applications?.length} başvuranlar</span>
        </div>
        <div className="pt-4">
          <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
            {job?.position}
          </Badge>{" "}
          <Badge className={"text-red-700 font-bold"} variant={"ghost"}>
            {job?.jobType}
          </Badge>
          <Badge className={"text-yellow-700 font-bold"} variant={"ghost"}>
            {job?.experienceLevel}
          </Badge>
        </div>
        <div className="pt-4 flex items-center gap-2">
          <Button
            onClick={() => navigate(`/jobs/details/${job?._id}`)}
            className="border border-gray-600 bg-transparent text-black hover:bg-transparent"
          >
            Detay
          </Button>
          <Button className="bg-purple-500 hover:bg-purple-600">
            Şimdi Başvur
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobsCard;
