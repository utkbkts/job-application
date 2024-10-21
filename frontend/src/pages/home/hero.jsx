import { Button } from "@/components/ui/button";
import { MapPinned, Search } from "lucide-react";
import { CarouselHome } from "./partials/carousel-home";
import ExperienceAbout from "./partials/experienceAbout";

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
const HeroPage = () => {
  return (
    <div className="w-full flex flex-col   h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-4xl">
          İlgi alanlarınıza ve becerilerinize uygun bir iş bulun
        </h1>
        <h2>Tüm lider sektörlerde binlerce iş fırsatı sizi bekliyor.</h2>
        <div className="flex w-full relative">
          <input
            type="text"
            placeholder="iş ismi veya kelime"
            className="py-4 px-4 outline-none border border-r pl-10 w-full"
          />
          <Search
            color="rgba(197,153,229,1)"
            className="absolute left-2 top-4"
          />
          <div className="relative">
            <input
              type="text"
              placeholder="konum"
              className=" py-4 px-4 outline-none border pl-10 w-full"
            />
            <MapPinned
              color="rgba(197,153,229,1)"
              className="absolute left-2 top-4"
            />
          </div>
          <div>
            <Button className="bg-purple-500 hover:bg-purple-600 h-full w-[120px]">
              İş bul
            </Button>
          </div>
        </div>
        <div className="flex items-center pt-20">
          {homeImage.map((item) => (
            <img
              src={item.image}
              key={item.id}
              className="rounded-full h-12 w-12 -m-2"
            />
          ))}
        </div>
      </div>
      <div className="flex items-center mt-20 ">
        <CarouselHome />
      </div>
      <div className="mt-28 ">
        <ExperienceAbout />
      </div>
    </div>
  );
};

export default HeroPage;
