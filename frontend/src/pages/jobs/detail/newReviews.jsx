/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import LoadingButton from "@/components/ui/loadingButton";
import { Textarea } from "@/components/ui/textarea";
import { useCreateReviewsMutation } from "@/redux/api/reviewsApi";
import { reviewsSchema } from "@/schemas/reviewsSchema/reviewsSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";
const NewReviews = ({ data }) => {
  const { user } = useSelector((state) => state.auth);
  const [createReviews, { isSuccess, isError, error, isLoading }] =
    useCreateReviewsMutation();

  const existingReview = data?.job?.reviews?.find(
    (review) => review?.user?._id === user?._id
  );

  const jobId = data?.job?._id;
  const [rating, setRating] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const form = useForm({
    resolver: zodResolver(reviewsSchema),
    mode: "onChange",
    defaultValues: {
      comment: existingReview ? existingReview.comment : "",
      rating: existingReview ? existingReview.rating : "",
    },
  });
  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = form;
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Yorumun başarıyla kaydedildi.");
      setRating(0);
      setEditorContent("");
      setValue("comment", "");
      reset();
    }
  }, [isSuccess, isError, error]);
  const onSubmit = (values) => {
    createReviews({ ...values, rating, jobId });
  };
  return (
    <div>
      {" "}
      {user ? (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormField
              control={control}
              name="ratings"
              render={() => (
                <FormItem>
                  <Label>İlanı puanla: </Label>
                  <FormControl>
                    <StarRatings
                      rating={rating}
                      starRatedColor="#ffb829"
                      numberOfStars={5}
                      name="rating"
                      changeRating={(newRating) => {
                        setRating(newRating);
                        setValue("rating", newRating);
                        trigger("rating");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <Label>Açıklama</Label>
                  <FormControl>
                    <Textarea placeholder="Mesajınız" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" mt-2">
              {isLoading ? (
                <LoadingButton>Gönderiliyor</LoadingButton>
              ) : (
                <Button className="w-full">
                  {existingReview ? "Güncelle" : "Gönder"}
                </Button>
              )}
            </div>
          </form>
        </Form>
      ) : (
        <div>
          <span>Yorum yapman için giriş yapman gerekiyor</span>
        </div>
      )}
    </div>
  );
};

export default NewReviews;
