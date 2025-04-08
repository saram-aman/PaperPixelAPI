import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createFolder = async (req: Request, res: Response) => {
  const { name, parentId } = req.body;
  try {
    const folder = await prisma.folder.create({
      data: { name, parentId },
    });
    res.status(201).json(folder);
  } catch (err) {
    res.status(500).json({ error: "Unable to create folder." });
  }
};

export const getFolder = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const folder = await prisma.folder.findUnique({
      where: { id },
      include: { files: true },
    });
    res.status(200).json(folder);
  } catch {
    res.status(404).json({ error: "Folder not found." });
  }
};

export const getChildren = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const children = await prisma.folder.findMany({
      where: { parentId: id },
    });
    res.status(200).json(children);
  } catch {
    res.status(500).json({ error: "Error fetching children." });
  }
};
