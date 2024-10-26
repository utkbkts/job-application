import TableDashboard from "./partials/table";
import { Input } from "@/components/ui/input";

const MyAds = () => {
  return (
    <div className=" mt-12">
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5">
          <Input className="w-fit" placeholder="filtrele isme göre" />
        </div>
        <TableDashboard />
      </div>
    </div>
  );
};

export default MyAds;
