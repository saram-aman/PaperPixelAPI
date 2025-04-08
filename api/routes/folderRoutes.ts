import express from "express";
import {
  createFolder,
  getFolder,
  getChildren,
} from "../controllers/folderController";

const router = express.Router();

router.post("/", createFolder);
router.get("/:id", getFolder);
router.get("/:id/children", getChildren);

export default router;
