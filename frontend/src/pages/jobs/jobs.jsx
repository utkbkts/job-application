import JobsCard from "@/components/cardJobs/jobsCard";
import FilterDataGroup from "@/components/filterDataGroup/filterDataGroup";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useGetAllJobsQuery } from "@/redux/api/jobsApi";
import { useSearchParams } from "react-router-dom";

const Jobs = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page") || 1;
  const search = searchParams.get("query") || "";
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const category = searchParams.get("category");
  const ratings = searchParams.get("ratings");
  const location = searchParams.get("location");
  const companyName = searchParams.get("companyName");
  const title = searchParams.get("title");
  const params = { page, search };

  min !== null && (params.min = min);
  max !== null && (params.max = max);

  category !== null && (params.category = category);
  ratings !== null && (params.ratings = ratings);
  companyName !== null && (params.companyName = companyName);
  title !== null && (params.title = title);
  location !== null && (params.location = location);
  const { data: getAllJobs } = useGetAllJobsQuery(params);

  return (
    <div className="container mx-auto mt-12 pb-12">
      <div className="flex md:flex-row flex-col">
        <div className="md:w-1/4 md:pb-0 pb-4 w-full sticky top-0 h-full">
          <h1>Filtreleyin</h1>
          <Separator />

          <FilterDataGroup data={getAllJobs} />
        </div>
        <div className="w-full grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 overflow-auto overflow-x-hidden h-screen">
          {getAllJobs?.job?.length > 0 ? (
            <>
              {getAllJobs?.job?.map((job, index) => (
                <JobsCard key={index} job={job} />
              ))}
            </>
          ) : (
            <div className=" flex items-center  w-full flex-col gap-2">
              <h1>Hiç bir sonuç bulunamadı</h1>
              <Button
                onClick={() => setSearchParams("")}
                className="bg-blue-700 hover:bg-blue-600"
              >
                Sıfırlamak için tıkla
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
