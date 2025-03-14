// articleController.ts
import { Request, Response, RequestHandler} from "express";
import Article from "../models/Article";
import mongoose from "mongoose";
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
// Get Articles by Filter
/*export const getArticleByFilter = async (req: Request, res: Response): Promise<Response | void> => {
  const { category, tags } = req.query;

  // Build the filter query object
  const filter: any = {};

  if (category) {
    filter.category = category;
  }

  if (tags) {
    const tagsArray = (tags as string).split(',').map(tag => tag.trim());
    filter.tags = { $all: tagsArray }; // Ensures all provided tags are matched
  }

  try {
    const filteredArticles = await Article.find(filter).populate("category tags");
    
    if (!filteredArticles.length) {
      return res.status(404).json({ message: "No articles found matching the filters." });
    }

    return res.json(filteredArticles);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch articles", details: error });
  }
};
export const getArticleByFilter = async (req: Request, res: Response): Promise<Response | void> => {
  const { category, tags } = req.query;

  const filter: any = {};

  if (category) {
    filter.category = category; // No ObjectId conversion since .populate() is not used
  }

  if (tags) {
    const tagsArray = (tags as string).split(',').map(tag => tag.trim());
    filter.tags = { $all: tagsArray };
  }

  try {
    const filteredArticles = await Article.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "categories",          // Collection name for Category
          localField: "category",     // Field in Article model
          foreignField: "_id",        // Field in Category model
          as: "categoryDetails"       // Alias for joined data
        }
      },
      {
        $lookup: {
          from: "tags",               // Collection name for Tag
          localField: "tags",         // Field in Article model
          foreignField: "_id",        // Field in Tag model
          as: "tagDetails"            // Alias for joined data
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          body: 1,
          image_url: 1,
          category: { $arrayElemAt: ["$categoryDetails", 0] }, // Extract first category object
          tags: "$tagDetails",                                 // List all tag details
          createdAt: 1,
          id: 1,
          date: 1,
          time: 1,
          name: 1
        }
      }
    ]);

    if (!filteredArticles.length) {
      return res.status(404).json({ message: "No articles found matching the filters." });
    }

    return res.json(filteredArticles);
  } catch (error) {
    return res.status(500).json({ error: "Could not fetch articles", details: error });
  }
};*/
// Get Articles by Filter
// Get Articles by Filter using category and tag IDs as query parameters
// Get Articles by Filter using category and tag IDs with metadata
/*export const getArticleByFilter = async (req: Request, res: Response): Promise<Response | void> => {
  const { category, tags } = req.query;

  try {
    // Build the basic match filter
    const matchStage: any = {};

    // Handle category filter
    if (category) {
      matchStage.category = category as string;
    }

    // Handle tags filter
    if (tags) {
      const tagsArray = (tags as string).split(',').map(tag => tag.trim());
      matchStage.tags = { $in: tagsArray };
    }

    // Use aggregation to find articles and add metadata
    const filteredArticles = await Article.aggregate([
      // Match articles based on filter criteria
      { $match: matchStage },
      
      // Add category metadata - lookup from categories collection
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryMetadata"
        }
      },
      
      // Add tags metadata - lookup from tags collection
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "tagsMetadata"
        }
      },
      
      // Restructure the output
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          body: 1,
          image_url: 1,
          category: 1,  // Keep original category ID
          categoryMetadata: { $arrayElemAt: ["$categoryMetadata", 0] },  // Include category details
          tags: 1,  // Keep original tag IDs
          tagsMetadata: 1,  // Include tag details
          createdAt: 1,
          id: 1,
          date: 1,
          time: 1,
          name: 1
        }
      }
    ]);

    console.log(`Found ${filteredArticles.length} articles matching the filter`);
    
    if (!filteredArticles.length) {
      return res.status(404).json({ message: "No articles found matching the filters." });
    }

    return res.json(filteredArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({ 
      error: "Could not fetch articles", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
};

// Get Articles by Filter using category and tag IDs with properly formatted metadata
export const getArticleByFilter = async (req: Request, res: Response): Promise<Response | void> => {
  const { category, tags } = req.query;

  try {
    // Build the basic match filter
    const matchStage: any = {};

    // Handle category filter (using string ID directly)
    if (category) {
      matchStage.category = category as string;
    }

    // Handle tags filter (using string IDs directly)
    if (tags) {
      const tagsArray = (tags as string).split(',').map(tag => tag.trim());
      // Use $all to match documents that have all the specified tags
      matchStage.tags = { $all: tagsArray };
    }

    // Use aggregation pipeline to find articles and add metadata
    const pipeline = [
      // First stage: Match articles based on filter criteria
      { $match: matchStage },
      
      // Second stage: Lookup category metadata
      {
        $lookup: {
          from: "categories", // The collection name for categories
          let: { categoryId: { $toObjectId: "$category" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } }
          ],
          as: "categoryMetadata"
        }
      },
      
      // Third stage: Lookup tags metadata
      {
        $lookup: {
          from: "tags", // The collection name for tags
          let: { tagIds: { $map: { input: "$tags", as: "tagId", in: { $toObjectId: "$$tagId" } } } },
          pipeline: [
            { $match: { $expr: { $in: ["$_id", "$$tagIds"] } } }
          ],
          as: "tagsMetadata"
        }
      },
      
      // Fourth stage: Format the output
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          body: 1,
          image_url: 1,
          category: 1,
          categoryMetadata: { $arrayElemAt: ["$categoryMetadata", 0] },
          tags: 1,
          tagsMetadata: 1,
          createdAt: 1,
          id: 1,
          date: 1,
          time: 1,
          name: 1
        }
      }
    ];

    const filteredArticles = await Article.aggregate(pipeline);
    
    if (!filteredArticles.length) {
      return res.status(404).json({ message: "No articles found matching the filters." });
    }

    return res.json(filteredArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({ 
      error: "Could not fetch articles", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
};*/
export const getArticleByFilter = async (req: Request, res: Response): Promise<Response | void> => {
  const { category, tags } = req.query;

  try {
    const matchStage: any = {};

    if (category) {
      matchStage.category = category as string;
    }

    if (tags) {
      const tagsArray = (tags as string).split(',').map(tag => tag.trim());
      matchStage.tags = { $all: tagsArray };
    }

    const pipeline = [
      { $match: matchStage },
      
      // Lookup category
      {
        $lookup: {
          from: "categories",
          let: { categoryId: { $toObjectId: "$category" } },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$categoryId"] } } }
          ],
          as: "categoryMetadata"
        }
      },
      
      // Lookup tags (Fixed)
      {
        $lookup: {
          from: "tags",
          localField: "tags",       // Directly match string IDs
          foreignField: "_id",
          as: "tagsMetadata"
        }
      },

      // Project result
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          body: 1,
          image_url: 1,
          category: 1,
          categoryMetadata: { $arrayElemAt: ["$categoryMetadata", 0] },
          tags: 1,
          tagsMetadata: 1,
          createdAt: 1,
          id: 1,
          date: 1,
          time: 1,
          name: 1
        }
      }
    ];

    const filteredArticles = await Article.aggregate(pipeline);
    
    if (!filteredArticles.length) {
      return res.status(404).json({ message: "No articles found matching the filters." });
    }

    return res.json(filteredArticles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return res.status(500).json({ 
      error: "Could not fetch articles", 
      details: error instanceof Error ? error.message : String(error) 
    });
  }
};
