import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: Number,
    },
    location: {
      type: String,
    },
    logo: {
      public_id: { type: String },
      url: { type: String },
    },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);

export default Company;
