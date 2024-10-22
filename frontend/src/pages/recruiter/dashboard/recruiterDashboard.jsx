import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TableDashboard from "./partials/table";
import { useNavigate } from "react-router-dom";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className=" mt-12">
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5">
          <Input className="w-fit" placeholder="filtrele isme göre" />
          <Button onClick={() => navigate("/recruiter/companies/create")}>
            Yeni şirket ekle
          </Button>
        </div>
        <TableDashboard />
      </div>
    </div>
  );
};

export default RecruiterDashboard;
