import mongoose from "mongoose";

const ConnectedMongoDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("connected is mongodb success");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
};

export default ConnectedMongoDB;
