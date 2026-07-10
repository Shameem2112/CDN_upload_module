import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import notFound from "./shared/middleware/notFound.middleware.js";
import errorMiddleware from "./shared/middleware/error.middleware.js";
import fileRoutes from "./domains/file/routes/file.routes.js";
import authRoutes from "./domains/auth/routes/auth.routes.js";

const app = express();
//security middleware helmet
app.use(helmet());

//cors middleware
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "10mb" }));

app.use(express.urlencoded({ extended: true, limit: "10mb" }));


app.use(morgan("dev"));
app.use("/api/auth", authRoutes);


app.use("/api/files", fileRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "CDN Upload Module API Running",
  });
});

app.use(notFound);


app.use(errorMiddleware);

export default app;