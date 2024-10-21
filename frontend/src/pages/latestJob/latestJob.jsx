import { Separator } from "@/components/ui/separator";
import JobsCard from "../../components/cardJobs/jobsCard";
import { useGetAllJobsQuery } from "@/redux/api/jobsApi";

const LatestJobs = () => {
  const { data: getAllJobs } = useGetAllJobsQuery();

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold">En son paylaşılan işler</h1>
      <Separator className="mb-2 mt-2" />
      <div className="grid grid-cols-3 gap-4 my-5">
        {getAllJobs?.job?.map((job, index) => (
          <JobsCard key={index} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
