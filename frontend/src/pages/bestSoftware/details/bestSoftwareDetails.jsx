import { useProjectByIdQuery } from "@/redux/api/projectApi";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import Markdown from "@/components/markdown/markDown";
import AllReviews from "./partials/AllReviews";
import NewReviews from "./partials/NewReviews";
import StarRatings from "react-star-ratings";

const BestSoftwareDetails = () => {
  const { id } = useParams();
  const { data } = useProjectByIdQuery({ id });
  const [currentIndex, setCurrentIndex] = useState(0);

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
  return (
    <div className="max-w-6xl mx-auto mt-24">
      <div>
        <div className=" w-full relative">
          <img
            src={data?.project.image[currentIndex].url}
            alt={`${data?.project.title}`}
            className="w-full h-[400px] object-cover rounded-md mb-4"
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
        <Separator />
        <div className="mt-12">
          <h1 className="font-bold text-2xl text-center ">
            {data?.project?.title}
          </h1>
          <div className="flex items-center gap-2 md:flex-row flex-col">
            <span>Kullanıcılar projeyi oyladı:</span>
            <StarRatings
              rating={data?.project?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="ratings"
              starDimension="30px"
              starSpacing="1px"
            />
            <span>toplam ({data?.project?.numOfReviews}) kişi oyladı.</span>
            <span>({data?.project?.ratings})/5 </span>
          </div>
          <Markdown>{data?.project?.description}</Markdown>
        </div>
        <div className="overflow-x-auto h-[600px]">
          <h1 className="font-bold text-2xl">Tüm Yorumlar</h1>
          <AllReviews data={data} />
        </div>
        <NewReviews data={data} />
      </div>
    </div>
  );
};

export default BestSoftwareDetails;
