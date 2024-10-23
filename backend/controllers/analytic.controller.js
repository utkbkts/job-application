import catchAsyncError from "../middleware/catch.middleware.js";
import Reviews from "../models/reviews.models.js";
import ErrorHandler from "../utils/error.handler.js";

const getMostActiveUser = catchAsyncError(async (req, res, next) => {
  const mostActiveUser = await Reviews.aggregate([
    {
      $group: {
        _id: "$user", // Kullanıcıya göre grupla
        commentCount: { $sum: 1 }, // Yorum sayısını toplama
      },
    },
    {
      $sort: { commentCount: -1 }, // Yorum sayısına göre sırala
    },
    {
      $limit: 1, // En aktif kullanıcıyı al
    },
    {
      $lookup: {
        from: "users", // Kullanıcıların saklandığı koleksiyon ismi
        localField: "_id", // Reviews'daki user field'ı
        foreignField: "_id", // User modelindeki _id field'ı
        as: "userInfo", // Kullanıcı bilgilerini almak için kullanılacak alias
      },
    },
    {
      $unwind: "$userInfo", // Kullanıcı bilgilerini düzleştir
    },
    {
      $project: {
        _id: 0, // Sonuçta _id'yi gösterme
        userId: "$_id", // Kullanıcı ID'sini userId olarak göster
        userInfo: 1, // Kullanıcı bilgilerini göster
        commentCount: 1, // Yorum sayısını göster
      },
    },
  ]);

  if (!mostActiveUser.length) {
    return next(new ErrorHandler("Yorum bulunamadı", 404));
  }

  return res.status(200).json({
    success: true,
    mostActiveUser: mostActiveUser[0], // Kullanıcı ve yorum bilgileri
  });
});

export default { getMostActiveUser };
