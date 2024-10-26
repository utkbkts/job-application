import { Button } from "@/components/ui/button";
import { FormatDate } from "@/helpers/formatDate";
import { useDeleteReviewsMutation } from "@/redux/api/projectApi";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const AllReviews = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const [deleteReviews, { isError, isSuccess, error }] =
    useDeleteReviewsMutation();
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Yorumun başarıyla kaydedildi.");
    }
  }, [isSuccess, isError, error]);

  const handleClick = async (id) => {
    await deleteReviews({ projectId: data?.project?._id, id: id });
  };
  return (
    <div className="mb-8 mt-4 flex flex-col gap-2">
      {data?.project?.reviews?.map((item) => (
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
