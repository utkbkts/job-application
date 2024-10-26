import { Button } from "@/components/ui/button";
import { MapPinned, Search, X } from "lucide-react";
import { CarouselHome } from "./partials/carousel-home";
import ExperienceAbout from "./partials/experienceAbout";
import { useState } from "react";
import LocationInput from "@/components/locationInput/locationInput";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "@/schemas/searchSchema/searchSchema";

const homeImage = [
  { id: 1, image: "/home/1.jpg" },
  { id: 2, image: "/home/2.jpg" },
  { id: 3, image: "/home/3.jpg" },
  { id: 4, image: "/home/4.jpg" },
  { id: 5, image: "/home/5.jpg" },
];

const HeroPage = () => {
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(searchSchema),
    mode: "onChange",
    defaultValues: {
      search: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  const onSubmit = () => {
    const params = new URLSearchParams();

    if (form.getValues("search")) {
      params.append("query", form.getValues("search"));
    }
    if (location) {
      params.append("location", location);
    }

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="w-full flex flex-col h-screen">
      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold text-4xl">
          İlgi alanlarınıza ve becerilerinize uygun bir iş bulun
        </h1>
        <h2>Tüm lider sektörlerde binlerce iş fırsatı sizi bekliyor.</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full relative"
        >
          <input
            type="text"
            {...register("search")}
            placeholder="iş ismi veya kelime"
            className="py-4 px-4 outline-none border border-r pl-10 w-full"
          />
          {errors && (
            <span className="absolute -bottom-5 text-red-600">
              {errors?.search?.message}
            </span>
          )}
          <Search
            color="rgba(197,153,229,1)"
            className="absolute left-2 top-6"
          />
          <div className="relative py-4 px-4 outline-none border border-r pl-10">
            <LocationInput
              onLocationSelected={setLocation}
              className={"border-none !outline-none focus:border-none"}
            />
            <MapPinned
              color="rgba(197,153,229,1)"
              className="absolute left-2 top-6"
            />

            {location && (
              <div className="flex items-center gap-1 absolute -bottom-8">
                <button type="button" onClick={() => setLocation("")}>
                  <X size={20} />
                </button>
                <span className="text-sm whitespace-nowrap">{location}</span>
              </div>
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 h-full w-[120px]"
            >
              İş bul
            </Button>
          </div>
        </form>
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
      <div className="flex items-center mt-20">
        <CarouselHome />
      </div>
      <div className="mt-28">
        <ExperienceAbout />
      </div>
    </div>
  );
};

export default HeroPage;
