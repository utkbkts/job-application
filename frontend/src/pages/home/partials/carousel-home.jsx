import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "FullStack Developer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Data Scientist",
  "Mobile App Developer",
  "Machine Learning Engineer",
  "Cloud Architect",
  "Software Tester",
];

export function CarouselHome() {
  return (
    <Carousel className="w-full max-w-xl mx-auto">
      <CarouselContent>
        {category.map((item, index) => (
          <CarouselItem key={index} className={"md:basis-1/2 lg-basis-1/3"}>
            <Button variant={"link"}>{item}</Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
