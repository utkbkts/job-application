import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import ConnectedMongoDB from "./db/connected.mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
//routes
import authRouters from "./routes/user.routes.js";
import companyRouters from "./routes/company.routes.js";
import jobsRouters from "./routes/jobs.routes.js";
import applicationRouters from "./routes/application.routes.js";
import reviewsRouters from "./routes/reviews.route.js";
import analyticRouters from "./routes/analytic.route.js";
import projectRouters from "./routes/project.route.js";
import path from "path";
const app = express();

app.use(cookieParser());
dotenv.config();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

const __dirname = path.resolve();
//middleware

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//routes
app.use("/api/auth", authRouters);
app.use("/api/company", companyRouters);
app.use("/api/jobs", jobsRouters);
app.use("/api/application", applicationRouters);
app.use("/api/reviews", reviewsRouters);
app.use("/api/analytic", analyticRouters);
app.use("/api/projects", projectRouters);

app.use(errorMiddleware);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT, () => {
  ConnectedMongoDB();
  console.log(`server is running ${process.env.PORT}`);
});
