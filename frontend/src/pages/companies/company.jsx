import CompaniesCard from "@/components/companiesCard/companiesCard";

import { useGetAllCompanyQuery } from "@/redux/api/companyApi";
import FilterSelect from "./partials/filterSelect";
import { Separator } from "@/components/ui/separator";

import RatingsFilter from "./partials/ratingsFilter";
import FilteredTime from "./partials/filteredTime";
import { jobTypes, locationTypes } from "@/lib/utils";
import JobsFilteredTime from "./partials/jobsFilteredTime";

const Company = () => {
  const { data } = useGetAllCompanyQuery();
  console.log("🚀 ~ Company ~ data:", data);
  return (
    <div className="p-4 flex">
      <div className="w-1/5">
        <h1 className="pb-4">Şirketleri filtrele</h1>
        <Separator className="mb-4" />
        <div>
          <FilterSelect />
        </div>
        <div className="pt-4">
          <h1>Şirket Puanları:</h1>
          <RatingsFilter />
        </div>
        <div className="pt-4">
          <h1 className="pb-2">Çalışma şartları</h1>
          {locationTypes.map((item, index) => (
            <FilteredTime key={index} item={item} />
          ))}
        </div>
        <div className="pt-4">
          <h1 className="pb-2">İş şartları</h1>
          {jobTypes.map((item, index) => (
            <JobsFilteredTime key={index} item={item} />
          ))}
        </div>
      </div>
      <div className="w-full">
        <h1 className="font-bold mb-4 text-2xl">Toplam (50) adet şirket var</h1>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {Array.from({ length: 50 }).map((item) => (
            <CompaniesCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
