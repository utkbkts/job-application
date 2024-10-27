import CompaniesCard from "@/components/companiesCard/companiesCard";

import { useGetAllCompanyQuery } from "@/redux/api/companyApi";

const Company = () => {
  const { data } = useGetAllCompanyQuery();
  return (
    <div className="p-4 flex max-w-5xl mx-auto">
      <div className="w-full">
        <h1 className="font-bold mb-4 text-2xl">
          Toplam ({data?.company?.length}) adet şirket var
        </h1>
        <div className="grid lg:grid-cols-2 grid-cols-1   gap-4">
          {data?.company?.map((item) => (
            <CompaniesCard key={item} job={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Company;
