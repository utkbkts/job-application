import express from "express";
import reviewsControllers from "../controllers/reviews.controllers.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", isAuthenticatedUser, reviewsControllers.reviewsCreate);
router.get("/getReviews", reviewsControllers.getReviews);
router.delete(
  "/delete/reviews",
  isAuthenticatedUser,
  reviewsControllers.deleteReviews
);

export default router;
