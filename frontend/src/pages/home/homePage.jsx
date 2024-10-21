import LatestJobs from "../latestJob/latestJob";
import HeroPage from "./hero";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto  pt-20 flex flex-col">
        <HeroPage />
        <LatestJobs />
      </div>
    </div>
  );
};

export default HomePage;
