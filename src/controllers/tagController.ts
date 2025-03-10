import { Request, Response } from "express";
import Tag from "../models/Tag";

export const createTag = async (req: Request, res: Response) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ error: "Could not create tag" });
  }
};

export const getTags = async (_req: Request, res: Response) => {
  const tags = await Tag.find();
  res.json(tags);
};
