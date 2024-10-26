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
  console.log("🚀 ~ deleteShareProject ~ projectId:", projectId);

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
  }).lean();

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

export default {
  createShareProject,
  updateShareProject,
  deleteShareProject,
  shareIdProject,
  myProjects,
  projectsAll,
};
