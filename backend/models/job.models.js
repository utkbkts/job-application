import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        required: true,
      },
    ],
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    locationTypes: {
      type: String,
      enum: {
        values: ["Remote", "On-site", "Hybrid"],
        message: "Lütfen konum tipini belirleyiniz.",
      },
      required: true,
    },
    experienceLevel: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      enum: {
        values: ["Tam-zamanlı", "Yarı-zamanlı", "Sözleşmeli", "Geçiçi", "Staj"],
        message: "Lütfen Statü'yü belirleyiniz.",
      },
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
