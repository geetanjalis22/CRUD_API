// articleController.ts
import { Request, Response } from "express";
import Article from "../models/Article";

//Creates Article
export const createArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ error: "Could not create article" });
  }
};

//Read Articles
export const getArticles = async (_req: Request, res: Response) => {
  const articles = await Article.find().populate("category tags");
  res.json(articles);
};

//Update Article
export const updateArticle = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const updatedArticle = await Article.findByIdAndUpdate(id, req.body, {
      new: true,          // Return the updated document
      runValidators: true // Ensure validation rules are applied
    });
    
    if (!updatedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    
    return res.json(updatedArticle);
  } catch (error) {
    return res.status(400).json({ error: "Could not update article", details: error });
  }
};

// Delete Article
export const deleteArticle = async (req: Request, res: Response): Promise<Response | void> => {
  const { id } = req.params;
  try {
    const deletedArticle = await Article.findByIdAndDelete(id);
    
    if (!deletedArticle) {
      return res.status(404).json({ error: "Article not found" });
    }
    
    return res.json({ message: "Article deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Could not delete article", details: error });
  }
};