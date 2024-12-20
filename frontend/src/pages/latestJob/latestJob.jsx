import { Separator } from "@/components/ui/separator";
import JobsCard from "../../components/cardJobs/jobsCard";
import { useGetAllJobsQuery } from "@/redux/api/jobsApi";

const LatestJobs = () => {
  const { data: getAllJobs } = useGetAllJobsQuery();
  return (
    <div className="mt-20">
      <h1 className="text-3xl font-bold">En son paylaşılan işler</h1>
      <Separator className="mb-2 mt-2" />
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 my-5">
        {getAllJobs?.jobs?.map((job) => (
          <JobsCard key={job._id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
