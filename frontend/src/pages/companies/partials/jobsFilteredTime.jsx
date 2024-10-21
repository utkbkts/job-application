const JobsFilteredTime = ({ item }) => {
  return (
    <div className="flex items-center gap-2 ">
      <input type="checkbox" name={item} id={item} />
      <label htmlFor={item}>{item}</label>
    </div>
  );
};

export default JobsFilteredTime;
