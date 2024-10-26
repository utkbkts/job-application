import { Input } from "@/components/ui/input";
import TableProjects from "./partials/table";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyProjects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleEdit = (projectId) => {
    navigate(`/profile/update/${projectId}`);
  };
  return (
    <div className=" mt-12">
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex justify-between items-center my-5">
          <Input
            className="w-fit"
            placeholder="Filtrele isme göre"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <TableProjects searchQuery={searchQuery} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default MyProjects;
