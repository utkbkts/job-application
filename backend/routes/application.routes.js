import express from "express";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
import applicationControllers from "../controllers/application.controllers.js";

const router = express.Router();

router.post(
  "/apply/:id",
  isAuthenticatedUser,
  applicationControllers.submitJobApplication
);

router.get(
  "/get/userjobs",
  isAuthenticatedUser,
  applicationControllers.listJobApplications
);

router.get(
  "/get/userjobsdetail/:id",
  isAuthenticatedUser,
  applicationControllers.retrieveJobApplicants
);

router.put(
  "/update/:id",
  isAuthenticatedUser,
  applicationControllers.updateJobApplicants
);

export default router;
