import express from "express";
import projectShareControllers from "../controllers/project.share.controllers.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
  "/create",
  isAuthenticatedUser,
  projectShareControllers.createShareProject
);

router.put(
  "/update/:id",
  isAuthenticatedUser,
  projectShareControllers.updateShareProject
);

router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  projectShareControllers.deleteShareProject
);

router.get("/projectById/:id", projectShareControllers.shareIdProject);

router.get(
  "/myProjects",
  isAuthenticatedUser,
  projectShareControllers.myProjects
);

router.get("/projectsAll", projectShareControllers.projectsAll);

router.put(
  "/projectReview",
  isAuthenticatedUser,
  projectShareControllers.createProductReview
);

router.get("/projectReview", projectShareControllers.getProductReview);

router.delete(
  "/projectReview",
  isAuthenticatedUser,
  projectShareControllers.deleteReview
);

export default router;
