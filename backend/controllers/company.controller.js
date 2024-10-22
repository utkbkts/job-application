import Company from "../models/company.models.js";
import { upload_file } from "../utils/cloudinary.js";
import ErrorHandler from "../utils/error.handler.js";

const CompanyRegister = async (req, res, next) => {
  const { companyName, description, location, website, locationType, logo } =
    req.body;
  let company = await Company.findOne({ companyName });

  if (company) {
    return next(new ErrorHandler("bu şirket kullanılıyor", 404));
  }

  company = await Company.create({
    companyName,
    description,
    location,
    website,
    locationType,
    user: req.user._id,
  });
  if (logo) {
    const uploadImages = await upload_file(logo, "jobs/create");
    company.logo = uploadImages;
    await company.save();
  }

  return res.status(201).json({
    message: "Company success created",
    company,
  });
};
const GetCompany = async (req, res, next) => {
  const user = req?.user?._id;
  const company = await Company.find({ user }).lean();

  if (!company) {
    return next(new ErrorHandler("Böyle bir şirket bulunumadı.", 404));
  }
  return res.status(201).json({
    company,
  });
};
const GetAllCompany = async (req, res, next) => {
  const company = await Company.find().lean();

  return res.status(201).json({
    company,
  });
};
const GetCompanyById = async (req, res, next) => {
  const companyId = req?.params?.id;
  const company = await Company.findById(companyId).lean();

  if (!company) {
    return next(new ErrorHandler("Böyle bir şirket bulunumadı.", 404));
  }

  return res.status(201).json({
    company,
  });
};

const UpdateCompany = async (req, res, next) => {
  let company = await Company.findById(req?.params?.id);

  if (!company) {
    return next(new ErrorHandler("company bulunamadı !", 404));
  }

  company = await Company.findByIdAndUpdate(req?.params?.id, req.body, {
    new: true,
  });
  return res.status(200).json({
    company,
  });
};

const DeleteCompany = async (req, res, next) => {
  const userId = req.user._id;
  let company = await Company.findById(req?.params?.id);

  if (!company) {
    return next(new ErrorHandler("company bulunamadı !", 404));
  }

  if (company.user.toString() !== userId.toString()) {
    return next(new ErrorHandler("Bu şirketi silme yetkiniz yok!", 403));
  }

  await company.deleteOne();

  return res.status(200).json({
    message: "şirket başarıyla silindi",
  });
};

export default {
  CompanyRegister,
  GetCompany,
  GetCompanyById,
  UpdateCompany,
  DeleteCompany,
  GetAllCompany,
};
