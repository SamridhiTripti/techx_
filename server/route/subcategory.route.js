import { Router } from 'express';
import {
  createSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryController,
  updateSubCategoryController
} from '../controllers/subcategory.controller.js';

const subCategoryRouter = Router();
subCategoryRouter.post('/create', createSubCategoryController);
subCategoryRouter.post('/get', getSubCategoryController);
subCategoryRouter.put('/update', updateSubCategoryController);
subCategoryRouter.delete('/delete', deleteSubCategoryController);

export default subCategoryRouter;
