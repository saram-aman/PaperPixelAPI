import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

let progress = 0;

export const uploadFile = async (req: Request, res: Response) => {
  const file = req.file;
  const { folderId } = req.body;
  if (!file || !folderId) return res.status(400).send("Missing data.");

  try {
    const saved = await prisma.file.create({
      data: {
        name: file.originalname,
        type: file.mimetype,
        path: file.path,
        folderId,
      },
    });
    progress = 100;
    res.status(200).json(saved);
  } catch (e) {
    res.status(500).json({ error: "Upload failed." });
  }
};

export const streamProgress = async (_: Request, res: Response) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  const interval = setInterval(() => {
    res.write(`data: ${progress}\n\n`);
    if (progress === 100) {
      clearInterval(interval);
      progress = 0;
    }
  }, 500);
};

export const searchFiles = async (req: Request, res: Response) => {
  const { query, folderId } = req.query;
  const files = await prisma.file.findMany({
    where: {
      folderId: folderId as string,
      name: {
        contains: query as string,
        mode: "insensitive",
      },
    },
  });
  res.json(files);
};

export const paginateFiles = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, folderId } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const files = await prisma.file.findMany({
    where: { folderId: folderId as string },
    skip,
    take: Number(limit),
  });
  res.json(files);
};
