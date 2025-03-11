// src/routes/articleRoutes.ts
import { Router } from 'express';
import { 
  createArticle, 
  getArticles, 
  updateArticle, 
  deleteArticle 
} from '../controllers/articleController';
import { RequestHandler } from 'express';

const router = Router();

router.post('/', createArticle as RequestHandler);
router.get('/', getArticles as RequestHandler);
router.put('/:id', updateArticle as RequestHandler);
router.delete('/:id', deleteArticle as RequestHandler);

export default router;


