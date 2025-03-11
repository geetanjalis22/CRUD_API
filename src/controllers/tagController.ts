// tagController.ts
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

export const updateTag = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const updatedTag = await Tag.findByIdAndUpdate(id, req.body, {
      new: true,          // Return the updated document
      runValidators: true // Ensures validation rules are applied
    });
    
    if (!updatedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    
    return res.json(updatedTag);
  } catch (error) {
    return res.status(400).json({ error: "Could not update tag", details: error });
  }
};

//Delete Tag
export const deleteTag = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const deletedTag = await Tag.findByIdAndDelete(id);
    
    if (!deletedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    
    return res.json({ message: "Tag deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete tag", details: error });
  }
};