import { Label } from "@/components/ui/label";
import { Checkbox } from "../ui/checkbox";
import StarRatings from "react-star-ratings";
import { useNavigate, useSearchParams } from "react-router-dom";
const fixedSalaryRanges = [
  { label: "0-5,000 TL", min: "0", max: "5.000" },
  { label: "5,000-10,000 TL", min: "5.000", max: "10.000" },
  { label: "10,000-15,000 TL", min: "10.000", max: "15.000" },
  { label: "15,000-20,000 TL", min: "15.000", max: "20.000" },
  { label: "20,000-30,000 TL", min: "20.000", max: "30.000" },
  { label: "30,000-50,000 TL", min: "30.000", max: "50.000" },
  { label: "50,000-100,000 TL", min: "50.000", max: "100.000" },
  { label: "100,000 TL ve üstü", min: "100.000", max: Infinity },
];

const FilterDataGroup = ({ data }) => {
  console.log("🚀 ~ FilterDataGroup ~ data:", data);
  let [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleCategoryFilter = (checkbox) => {
    const checkBoxes = document.getElementsByName(checkbox.name);
    checkBoxes.forEach((item) => {
      if (item !== checkbox) {
        item.checked = false;
      }

      if (checkbox.checked === false) {
        if (searchParams.has(checkbox.name)) {
          searchParams.delete(checkbox.name);
          const path = window.location.pathname + "?" + searchParams.toString();
          navigate(path);
        }
      } else {
        if (searchParams.has(checkbox.name)) {
          searchParams.set(checkbox.name, checkbox.value);
        } else {
          searchParams.append(checkbox.name, checkbox.value);
        }
        const path = window.location.pathname + "?" + searchParams.toString();

        navigate(path);
      }
    });
  };
  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const values = searchParams.getAll(checkboxType);
    return values.includes(checkboxValue);
  };
  const handlePrice = (range) => {
    const currentMin = searchParams.get("min");
    const currentMax = searchParams.get("max");

    if (
      currentMin === range.min.toString() &&
      currentMax === range.max.toString()
    ) {
      searchParams.delete("min");
      searchParams.delete("max");
    } else {
      searchParams.set("min", range.min);
      searchParams.set("max", range.max);
    }

    setSearchParams(searchParams);
    navigate(window.location.pathname + "?" + searchParams.toString());
  };
  const handleCheck = () => {
    searchParams = new URLSearchParams();
    setSearchParams(searchParams);
    navigate(window.location.pathname);
  };
  return (
    <div className="mt-4">
      <Label>Pozisyon</Label>
      <div className="flex flex-col">
        {data?.job?.map((job) => (
          <div key={job._id} className="flex items-center space-x-2 pt-2">
            <input
              className="cursor-pointer"
              type="checkbox"
              id={job.title}
              value={job.title}
              checked={defaultCheckHandler("title", job.title)}
              name={"title"}
              onClick={(e) => handleCategoryFilter(e.target)}
            />
            <Label htmlFor={job._id}>{job.title}</Label>
          </div>
        ))}
      </div>

      <div className="pt-4">
        <Label>Şirket Lokasyonu</Label>
        <div className="flex flex-col">
          {data?.job?.map((job) => (
            <div
              key={job.location}
              className="flex items-center space-x-2 pt-2"
            >
              <input
                className="cursor-pointer"
                type="checkbox"
                id={job.location}
                value={job.location}
                checked={defaultCheckHandler("location", job.location)}
                name={"location"}
                onClick={(e) => handleCategoryFilter(e.target)}
              />
              <Label htmlFor={job.location}>{job.location}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Label>Şirket ismi</Label>
        <div className="flex flex-col">
          {data?.job?.map((job) => (
            <div key={job._id} className="flex items-center space-x-2 pt-2">
              <input
                className="cursor-pointer"
                type="checkbox"
                id={job.companyName}
                value={job.companyName}
                checked={defaultCheckHandler("companyName", job.companyName)}
                name={"companyName"}
                onClick={(e) => handleCategoryFilter(e.target)}
              />
              <Label htmlFor={job.companyName}>{job.companyName}</Label>
            </div>
          ))}
        </div>
      </div>
      <h5>Değerlendirmeler</h5>
      {[5, 4, 3, 2, 1, 0]?.map((item, index) => {
        return (
          <div key={index}>
            <input
              className="cursor-pointer"
              type="checkbox"
              name="ratings"
              value={item}
              checked={defaultCheckHandler("ratings", item?.toString())}
              onClick={(e) => handleCategoryFilter(e.target)}
            />
            <StarRatings
              rating={parseFloat(item)}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="ratings"
              starDimension="14px"
              starSpacing="1px"
            />
          </div>
        );
      })}
      <div className="pt-4">
        <Label>Maaşlar</Label>
        <div className="flex flex-col">
          {fixedSalaryRanges.map((job, index) => (
            <div key={index} className="flex items-center space-x-2 pt-2">
              <Checkbox
                id={job.min}
                value={job.min}
                onClick={() => handlePrice(job)}
                checked={defaultCheckHandler("min", job.min.toString())}
                name="salary"
              />
              <Label htmlFor={job.label}>{job.label}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterDataGroup;
