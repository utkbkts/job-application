import express from "express";
import { validateRequestBody } from "../middleware/validate.middleware.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
import companyController from "../controllers/company.controller.js";
import { CompanySchema } from "../schema/companySchema/company.schema.js";

const router = express.Router();

router.post(
  "/create",
  validateRequestBody(CompanySchema),
  isAuthenticatedUser,
  companyController.CompanyRegister
);

router.get("/get", isAuthenticatedUser, companyController.GetCompany);

router.get("/getAll", companyController.GetAllCompany);

router.get("/get/:id", companyController.GetCompanyById);

router.put(
  "/update/:id",
  validateRequestBody(CompanySchema),
  isAuthenticatedUser,
  companyController.UpdateCompany
);

router.delete(
  "/delete/:id",
  isAuthenticatedUser,
  companyController.DeleteCompany
);

export default router;
