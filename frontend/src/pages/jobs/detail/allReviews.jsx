import { Button } from "@/components/ui/button";
import { FormatDate } from "@/helpers/formatDate";
import {
  useDeleteReviewsMutation,
  useGetReviewsQuery,
} from "@/redux/api/reviewsApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const AllReviews = ({ data }) => {
  const { id } = useParams();
  const { data: getReviewsQuery } = useGetReviewsQuery({ jobId: id });
  const [deleteReviews, { isSuccess, isError, error }] =
    useDeleteReviewsMutation();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
      console.log(error);
    }
    if (isSuccess) {
      toast.success("Yorumun başarılıy silindi");
    }
  }, [error, isSuccess, isError]);
  const handleClick = async (id) => {
    await deleteReviews({ jobId: data?.job?._id, id: id });
  };
  return (
    <div className="mb-8 mt-4 flex flex-col gap-2">
      {getReviewsQuery?.reviews?.map((item) => (
        <>
          <div className="bg-gray-200 p-4 rounded-md flex justify-between">
            <div className="flex gap-2 ">
              <img
                src={item?.user?.avatar?.url}
                className="w-12 h-12 rounded-full border border-blue-600"
                alt="image"
              />
              <div className="flex flex-col">
                <span>{item?.user?.fullname}</span>
                <span>{FormatDate(item?.createdAt)}</span>
                <p>{item?.comment}</p>
              </div>
            </div>
            {user?._id === item?.user?._id && (
              <div>
                <Button
                  onClick={() => handleClick(item?._id)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Sil
                </Button>
              </div>
            )}
          </div>
        </>
      ))}
    </div>
  );
};

export default AllReviews;
