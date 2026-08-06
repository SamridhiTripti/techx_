import { Router } from 'express';
import {
  addCategoryController,
  deleteCategoryController,
  getCategoryController,
  updateCategoryController
} from '../controllers/category.controller.js';

const categoryRouter = Router();
categoryRouter.post('/add-category', addCategoryController);
categoryRouter.get('/get', getCategoryController);
categoryRouter.put('/update', updateCategoryController);
categoryRouter.delete('/delete', deleteCategoryController);

export default categoryRouter;
