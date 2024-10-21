import JobsCard from "@/components/cardJobs/jobsCard";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { useGetAllJobsQuery } from "@/redux/api/jobsApi";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    fitlerType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"],
  },
];
const Jobs = () => {
  const { data: getAllJobs } = useGetAllJobsQuery();
  console.log(getAllJobs);
  return (
    <div className="container mx-auto mt-12 pb-12">
      <div className="flex md:flex-row flex-col">
        <div className="md:w-1/4 md:pb-0 pb-4 w-full sticky top-0 h-full">
          <h1>Filtreleyin</h1>
          <Separator />
          <RadioGroup>
            {fitlerData.map((data, index) => (
              <div key={index}>
                <h1 className="font-bold text-lg">{data.fitlerType}</h1>
                {data.array.map((item, idx) => {
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div key={idx} className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item} id={itemId} />
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  );
                })}
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 overflow-auto overflow-x-hidden h-screen">
          {getAllJobs?.job?.map((job, index) => (
            <JobsCard key={index} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
