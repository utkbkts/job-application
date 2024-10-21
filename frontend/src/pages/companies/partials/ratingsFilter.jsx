import StarRatings from "react-star-ratings";

const RatingsFilter = () => {
  return (
    <div>
      {[5, 4, 3, 2, 1].map((item, index) => (
        <div key={index} className="flex items-center gap-2 ">
          <input
            value={item}
            type="checkbox"
            className="cursor-pointer mt-[4px]"
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
      ))}
    </div>
  );
};

export default RatingsFilter;
