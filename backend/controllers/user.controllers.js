import { catchAsyncError } from "catchasyncerror";
import User from "../models/user.model.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import getDataUri from "../utils/data.uri.js";
import ErrorHandler from "../utils/error.handler.js";
import sendToken from "../utils/send.token.js";
import { v2 as cloudinary } from "cloudinary";

const Register = catchAsyncError(async (req, res, next) => {
  const {
    fullname,
    email,
    phoneNumber,
    password,
    userType,
    confirmPassword,
    avatar,
  } = req.body;

  const emailExisting = await User.findOne({ email });

  if (emailExisting) {
    return next(new ErrorHandler("Bu email kullanılıyor", 404));
  }

  const phoneNumberExisting = await User.findOne({ phoneNumber });

  if (phoneNumberExisting) {
    return next(new ErrorHandler("Bu telefon numarası kullanılıyor", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Şifreler eşleşmiyor", 400));
  }
  const user = await User.create({
    fullname,
    email,
    phoneNumber,
    password,
    userType,
    avatar,
  });

  const avatarUpload = await upload_file(avatar, "jobs/avatar");

  user.avatar = avatarUpload;
  await user.save();
  sendToken(user, 201, res);
});

const Login = catchAsyncError(async (req, res, next) => {
  const { email, password, userType } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Email veya parola yanlış", 404));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Şifre yanlış.", 401));
  }
  if (user.isBlocked === true) {
    return next(new ErrorHandler("Hesabınız engellenmiştir..", 401));
  }

  if (userType !== user.userType) {
    return next(new ErrorHandler("Bu role ait bir hesap bulunumadı.", 400));
  }
  sendToken(user, 201, res);
});

const LogoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    let cloudResponse;
    if (req.file) {
      const fileUri = getDataUri(req.file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        folder: "jobs/resume",
      });
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map((skill) => skill.trim()); // Becerileri temizle
    }

    const userId = req.user._id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found.",
        success: false,
      });
    }

    // Kullanıcı bilgilerini güncelle
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // Eğer yeni bir dosya yüklendiyse, özgeçmişi güncelle
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = req.file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Başarıyla güncellendi.",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Bir hata oluştu.",
      success: false,
    });
  }
};
const GetUserMyProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("-password");

  return res.status(200).json({
    user,
  });
});

const getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await User.find({}).sort({ createdAt: -1 }).lean();

  return res.status(201).json({
    users,
  });
});

export default {
  Register,
  Login,
  LogoutUser,
  updateProfile,
  GetUserMyProfile,
  getAllUsers,
};
