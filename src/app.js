import express from "express";
import cors from "cors";
import morgan from "morgan";

import notFound from "./shared/middleware/notFound.middleware.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import fileRoutes from "./domains/file/routes/file.routes.js";
import authRoutes from "./domains/auth/routes/auth.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CDN Upload Module API Running",
  });
});
app.use("/api/files", fileRoutes);

app.use(notFound);


app.use(errorMiddleware);

export default app;