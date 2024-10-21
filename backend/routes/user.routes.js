import express from "express";
import { validateRequestBody } from "../middleware/validate.middleware.js";
import { RegisterSchema } from "../schema/accountSchema/register.schema.js";
import userControllers from "../controllers/user.controllers.js";
import { LoginSchema } from "../schema/accountSchema/login.schema.js";
import { ProfileSchema } from "../schema/accountSchema/profile.schema.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
import { singleUpload } from "../middleware/multer.middleware.js";

const router = express.Router();

router.post(
  "/register",
  validateRequestBody(RegisterSchema),
  userControllers.Register
);

router.post("/login", validateRequestBody(LoginSchema), userControllers.Login);

router.post("/logout", userControllers.LogoutUser);

router.post(
  "/update",
  validateRequestBody(ProfileSchema),
  isAuthenticatedUser,
  singleUpload,
  userControllers.updateProfile
);
//me profile
router.get("/me", isAuthenticatedUser, userControllers.GetUserMyProfile);

export default router;
