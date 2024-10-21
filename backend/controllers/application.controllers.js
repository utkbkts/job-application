import Application from "../models/application.models.js";
import Job from "../models/job.models.js";
import ErrorHandler from "../utils/error.handler.js";

const submitJobApplication = async (req, res, next) => {
  const userId = req?.user?._id;

  const jobId = req.params.id;
  console.log("🚀 ~ submitJobApplication ~ jobId:", jobId);

  const existingApplication = await Application.findOne({
    job: jobId,
    applicant: userId,
  }).populate("applicant job");

  if (existingApplication) {
    return next(new ErrorHandler("Bu işe başvurdunuz", 404));
  }
  const job = await Job.findById(jobId);
  if (!job) {
    return next(new ErrorHandler("Job bulunamadı.", 404));
  }
  const newApplication = await Application.create({
    job: jobId,
    applicant: userId,
  });

  job.applications.push(newApplication._id);

  await job.save();

  return res.status(201).json({
    message: "İşe başarıyla başvuruldu",
  });
};

const listJobApplications = async (req, res, next) => {
  const userId = req.user._id;

  const application = await Application.find({ applicant: userId })
    .sort({
      createdAt: -1,
    })
    .populate({
      path: "job",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "company",
      },
    });
  if (!application) {
    return next(new ErrorHandler("başvuru bulunamadı.", 404));
  }

  return res.status(201).json({
    application,
  });
};

const retrieveJobApplicants = async (req, res, next) => {
  const jobId = req.params.id;

  const job = await Job.findById(jobId).populate({
    path: "applications",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "applicant",
    },
  });
  if (!job) {
    return next(new ErrorHandler("job bulunamadı."));
  }
  return res.status(201).json({
    job,
  });
};

const updateJobApplicants = async (req, res, next) => {
  const { status } = req.body;
  const applicationId = req.params.id;

  const application = await Application.findOne({ _id: applicationId });

  if (!application) {
    return next(new ErrorHandler("başvuru bulunamadı."));
  }

  application.status = status;
  await application.save();

  return res.status(201).json({
    message: "statü durumu güncellendi",
    application,
  });
};

export default {
  submitJobApplication,
  listJobApplications,
  retrieveJobApplicants,
  updateJobApplicants,
};
