import express from "express";
import { validateRequestBody } from "../middleware/validate.middleware.js";
import {
  authhorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import jobsControllers from "../controllers/jobs.controllers.js";
import { JobSchema } from "../schema/jobsSchema/jobs.schema.js";

const router = express.Router();

router.post(
  "/create",
  validateRequestBody(JobSchema),
  isAuthenticatedUser,
  jobsControllers.PostJob
);

router.get("/get/all", jobsControllers.GetAllJobs);

router.get("/jobId/:id", jobsControllers.GetJobById);

router.get("/myAds", isAuthenticatedUser, jobsControllers.getMyAds);

export default router;
