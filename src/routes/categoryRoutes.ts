// src/routes/categoryRoutes.ts
import { Router } from 'express';
import { 
  createCategory, 
  getCategories, 
  updateCategory, 
  deleteCategory 
} from '../controllers/categoryController';
import { RequestHandler } from 'express';

const router = Router();

router.post('/', createCategory as RequestHandler);
router.get('/', getCategories as RequestHandler);
router.put('/:id', updateCategory as RequestHandler);
router.delete('/:id', deleteCategory as RequestHandler);

export default router;
