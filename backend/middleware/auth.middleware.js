import User from "../models/user.model.js";
import ErrorHandler from "../utils/error.handler.js";
import jwt from "jsonwebtoken";
import catchAsyncError from "./catch.middleware.js";

export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Lütfen giriş yapınız", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);
  next();
});

export const authhorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(`Role (${req.user.role}) access this resource`, 403)
      );
    }
    next();
  };
};
