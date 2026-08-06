import { Router } from 'express';
import {
  createProductController,
  deleteProductController,
  getProductByCategoryAndSubCategoryController,
  getProductByCategoryController,
  getProductController,
  getProductDetailsController,
  searchProductController,
  updateProductController
} from '../controllers/product.controller.js';

const productRouter = Router();
productRouter.post('/create', createProductController);
productRouter.post('/get', getProductController);
productRouter.post('/get-product-by-category', getProductByCategoryController);
productRouter.post('/get-pruduct-by-category-and-subcategory', getProductByCategoryAndSubCategoryController);
productRouter.post('/get-product-details', getProductDetailsController);
productRouter.post('/search-product', searchProductController);
productRouter.put('/update-product-details', updateProductController);
productRouter.delete('/delete-product', deleteProductController);

export default productRouter;
