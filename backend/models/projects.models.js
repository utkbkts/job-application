import mongoose from "mongoose";

const projectModel = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    image: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectModel);

export default Project;
