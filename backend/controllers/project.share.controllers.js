import { catchAsyncError } from "catchasyncerror";
import Project from "../models/projects.models.js";
import ErrorHandler from "../utils/error.handler.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import apiFilter from "../utils/api.filters.js";

const createShareProject = catchAsyncError(async (req, res, next) => {
  const { title, description, image, githubLink } = req.body;

  if (!title || !description || !image || !githubLink) {
    return next(new ErrorHandler("Alanlar boş bırakılamaz", 404));
  }

  const project = await Project.create({
    title,
    description,
    githubLink,
    user: req.user._id,
  });

  if (image && Array.isArray(image)) {
    const uploadedImages = await Promise.all(
      image.map((img) => upload_file(img, "jobs/project"))
    );

    project.image = uploadedImages.map((img) => ({
      public_id: img.public_id,
      url: img.url,
    }));

    await project.save();
  }
  return res.status(201).json({
    project,
  });
});

const updateShareProject = catchAsyncError(async (req, res, next) => {
  const projectId = req.params.id;
  const { values } = req.body;

  let project = await Project.findById(projectId);
  const staticImages = await Promise.all(
    values.image?.map((item) => upload_file(item, "jobs/project"))
  );
  if (!project) {
    return next(new ErrorHandler("proje bulunamadı.", 404));
  }
  project = await Project.findByIdAndUpdate(
    projectId,
    {
      title: values.title,
      description: values.description,
      githubLink: values.githubLink,
      image: staticImages,
    },
    { new: true }
  );

  return res.status(200).json({
    project,
  });
});

const deleteShareProject = catchAsyncError(async (req, res, next) => {
  const projectId = req.params.id;

  const project = await Project.findOne({
    _id: projectId,
    user: req.user._id,
  }).lean();

  if (!project) {
    return next(new ErrorHandler("bu projeyi silmek için izniniz yok.", 404));
  }
  for (let i = 0; i < project.image.length; i++) {
    await delete_file(project.image[i].public_id);
  }

  await Project.deleteOne({ _id: projectId });

  return res.status(201).json({
    message: "başarıyla silindi",
  });
});

const shareIdProject = catchAsyncError(async (req, res, next) => {
  const projectId = req.params.id;

  const project = await Project.findOne({
    _id: projectId,
  })
    .lean()
    .populate("reviews.user");

  if (!project) {
    return next(new ErrorHandler("proje bulunamadı.", 404));
  }
  return res.status(201).json({
    project,
  });
});

const myProjects = catchAsyncError(async (req, res, next) => {
  const project = await Project.find({ user: req.user._id }).lean();

  if (!project) {
    return next(new ErrorHandler("proje bulunamadı.", 404));
  }
  return res.status(201).json({
    project,
  });
});

const projectsAll = catchAsyncError(async (req, res, next) => {
  const resPerPage = 6;

  const apiFilters = new apiFilter(Project, req.query).searchResult().filters();

  let project = await apiFilters.query.lean().populate("user");

  let FilteredProductCount = project.length;

  apiFilters.pagination(resPerPage);

  project = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    FilteredProductCount,
    project,
  });
});

const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, projectId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const project = await Project.findById(projectId);
  if (!project) {
    return next(new ErrorHandler("project not found !", 404));
  }

  const isReviewd = project?.reviews.find(
    (item) => item.user.toString() === req.user._id.toString()
  );

  if (isReviewd) {
    project.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    project.reviews.push(review);
    project.numOfReviews = project.reviews.length;
  }

  project.ratings =
    project.reviews.reduce((acc, item) => item.rating + acc, 0) /
    project.reviews.length;
  await project.save({ validateBeforeSave: false });

  return res.status(200).json({
    message: "Yorum başarılı şekilde gönderildi",
  });
});
const getProductReview = catchAsyncError(async (req, res, next) => {
  const project = await Project.findById(req.query.id).populate("reviews.user");

  if (!project) {
    return next(new ErrorHandler("Product not found !", 404));
  }
  return res.status(200).json({
    reviews: project.reviews,
  });
});

const deleteReview = catchAsyncError(async (req, res, next) => {
  let project = await Project.findById(req.query.projectId);

  if (!project) {
    return next(new ErrorHandler("project not found !", 404));
  }

  const reviews = project?.reviews?.filter(
    (reviwe) => reviwe._id.toString() !== req?.query?.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    numOfReviews === 0
      ? 0
      : project.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  project = await Project.findByIdAndUpdate(
    req.query.projectId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    project,
  });
});
export default {
  createShareProject,
  updateShareProject,
  deleteShareProject,
  shareIdProject,
  myProjects,
  projectsAll,
  createProductReview,
  getProductReview,
  deleteReview,
};
