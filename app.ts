import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import fileUploadRoutes from "./routes/fileRoutes";
import folderRoutes from "./routes/folderRoutes";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/files", fileUploadRoutes);
app.use("/api/folder", folderRoutes);

export default app;
