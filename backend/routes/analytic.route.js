import express from "express";
import analyticController from "../controllers/analytic.controller.js";

const router = express.Router();

router.get("/topReviews", analyticController.getMostActiveUser);

router.get("/topUser", analyticController.projectShareBest);

export default router;
