import catchAsyncError from "../middleware/catch.middleware.js";
import Job from "../models/job.models.js";
import apiFilter from "../utils/api.filters.js";
import ErrorHandler from "../utils/error.handler.js";

const PostJob = catchAsyncError(async (req, res, next) => {
  const {
    title,
    description,
    requirements,
    salary,
    location,
    jobType,
    experienceLevel,
    experience,
    position,
    companyId,
  } = req.body;

  const job = await Job.create({
    title,
    description,
    requirements,
    salary: Number(salary),
    location,
    jobType,
    experienceLevel,
    experience,
    position,
    company: companyId,
    user: req.user._id,
  });

  res.status(200).json({
    job,
  });
});

const GetAllJobs = catchAsyncError(async (req, res, next) => {
  const resPerPage = 5;

  const apiFilters = new apiFilter(Job, req.query).searchResult().filters();

  let job = await apiFilters.query.populate("company user applications");

  let FilteredProductCount = job.length;

  apiFilters.pagination(resPerPage);

  job = await apiFilters.query.clone();

  const jobs = await Job.find({})
    .lean()
    .populate("user applications company")
    .populate({
      path: "applications",
      populate: { path: "applicant" },
    });

  res.status(200).json({
    resPerPage,
    FilteredProductCount,
    job,
    jobs,
  });
});

const GetJobById = catchAsyncError(async (req, res, next) => {
  const jobId = req.params.id;
  const job = await Job.findById(jobId)
    .populate("user applications company")
    .populate({
      path: "applications",
      populate: { path: "applicant" }, // Başvuru yapan kullanıcının bilgilerini doldurur
    });

  if (!job) {
    return next(new ErrorHandler("jobs not found", 404));
  }

  res.status(200).json({
    job,
  });
});

const GetAdminJobs = catchAsyncError(async (req, res, next) => {
  const adminId = req.user._id;

  const job = await Job.find({ user: adminId }).populate({
    path: "company",
    createdAt: -1,
  });

  if (!job) {
    return next(new ErrorHandler("jobs not found", 404));
  }

  res.status(200).json({
    job,
  });
});

export default { PostJob, GetAllJobs, GetJobById, GetAdminJobs };
