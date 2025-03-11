// categoryController.ts
import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: "Could not create category" });
  }
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find();
  console.log("📋 Retrieved Categories:", categories);
  res.json(categories);
};

//Update Category
export const updateCategory = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,          // Return updated document
      runValidators: true // Ensure validation rules are applied
    });
    
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    return res.json(updatedCategory);
  } catch (error) {
    return res.status(400).json({ error: "Could not update category", details: error });
  }
};

//Delete Category
export const deleteCategory = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    
    return res.json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete category", details: error });
  }
};