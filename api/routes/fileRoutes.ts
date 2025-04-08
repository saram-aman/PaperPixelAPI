import express from "express";
import multer from "multer";
import {
  uploadFile,
  streamProgress,
  searchFiles,
  paginateFiles,
} from "../controllers/fileController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadFile);
router.get("/stream", streamProgress);
router.get("/search", searchFiles);
router.get("/page", paginateFiles);

export default router;
