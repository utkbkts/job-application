import catchAsyncError from "../middleware/catch.middleware.js";
import Job from "../models/job.models.js";
import Reviews from "../models/reviews.models.js";
import ErrorHandler from "../utils/error.handler.js";

const reviewsCreate = catchAsyncError(async (req, res, next) => {
  const { rating, comment, jobId } = req.body;

  // Yorum bilgisi
  const review = {
    user: req.user._id,
    job: jobId,
    rating: Number(rating),
    comment,
  };

  // Kullanıcının aynı iş ilanına daha önce yorum yapıp yapmadığını kontrol et
  const isReviewed = await Reviews.findOne({
    job: jobId,
    user: req.user._id,
  });

  if (isReviewed) {
    // Daha önceki yorumu güncelle
    isReviewed.comment = comment;
    isReviewed.rating = rating;
    await isReviewed.save();
  } else {
    // Yeni yorum oluştur ve Reviews koleksiyonuna kaydet
    const newReview = await Reviews.create(review);

    // Job modelindeki reviews alanına yeni yorumun _id'sini ekle
    await Job.findByIdAndUpdate(jobId, {
      $push: { reviews: newReview._id },
    });
  }

  // Tüm yorumları getir ve yeni ortalama puanı hesapla
  const reviews = await Reviews.find({ job: jobId });

  const ratings =
    reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

  // Job modelindeki ortalama puanı ve yorum sayısını güncelle
  await Job.findByIdAndUpdate(jobId, {
    ratings,
    numOfReviews: reviews.length,
  });

  return res.status(200).json({
    success: true,
  });
});

const getReviews = catchAsyncError(async (req, res, next) => {
  const jobId = req.query.jobId;
  if (!jobId) {
    return next(new ErrorHandler("Job ID gerekli", 400)); // Eğer jobId yoksa hata döndür
  }
  const reviews = await Reviews.find({ job: jobId })
    .lean()
    .populate("user job");

  return res.status(200).json({
    reviews,
  });
});

const deleteReviews = catchAsyncError(async (req, res, next) => {
  // İş ilanına ait yorumları bul
  const reviews = await Reviews.find({ job: req?.query?.jobId });

  if (!reviews) {
    return next(new ErrorHandler("Yorum bulunamadı", 404));
  }

  // Silinecek yorumu bul
  const reviewToDelete = reviews.find(
    (review) => review._id.toString() === req.query.id
  );

  if (!reviewToDelete) {
    return next(new ErrorHandler("Yorum bulunamadı", 404));
  }

  // Yorumu sil
  await Reviews.findByIdAndDelete(req.query.id);

  // Kalan yorumları filtrele
  const remainingReviews = reviews.filter(
    (review) => review._id.toString() !== req.query.id
  );

  const numOfReviews = remainingReviews.length;

  const ratings =
    numOfReviews > 0
      ? remainingReviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews
      : 0; // Eğer hiç yorum kalmadıysa 0

  // Job modelini güncelle
  await Job.findByIdAndUpdate(
    req.query.jobId,
    {
      reviews: remainingReviews.map((review) => review._id), // Kalan yorumların ID'lerini ekleyin
      numOfReviews,
      ratings,
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    message: "Yorum başarıyla silindi.",
    ratings,
    numOfReviews,
  });
});

export default { reviewsCreate, getReviews, deleteReviews };
