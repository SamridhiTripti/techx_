import mongoose from 'mongoose';
import dotenv from 'dotenv';
import CategoryModel from './models/cateogry.model.js';
import SubCategoryModel from './models/subcateogry.model.js';
import ProductModel from './models/product.model.js';
import { fallbackCategories, fallbackSubCategories, fallbackProducts } from './utils/fallbackData.js';

dotenv.config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI is not defined in server/.env');
  process.exit(1);
}

const connectDB = async () => {
  return mongoose.connect(uri);
};

const main = async () => {
  await connectDB();
  console.log('Connected to MongoDB');

  await CategoryModel.deleteMany({});
  await SubCategoryModel.deleteMany({});
  await ProductModel.deleteMany({});
  console.log('Cleared categories, subcategories, and products');

  const categoryDocs = await Promise.all(
    fallbackCategories.map((cat) => new CategoryModel({ name: cat.name, image: cat.image }).save())
  );

  const categoryIdMap = {};
  categoryDocs.forEach((doc, index) => {
    categoryIdMap[fallbackCategories[index]._id] = doc._id;
  });

  const subCategoryDocs = await Promise.all(
    fallbackSubCategories.map((sub) => {
      const categoryRefs = (sub.cateogry || []).map((categoryId) => categoryIdMap[categoryId]).filter(Boolean);
      return new SubCategoryModel({ name: sub.name, image: sub.image, cateogry: categoryRefs }).save();
    })
  );

  const subCategoryIdMap = {};
  subCategoryDocs.forEach((doc, index) => {
    subCategoryIdMap[fallbackSubCategories[index]._id] = doc._id;
  });

  const productDocs = await Promise.all(
    fallbackProducts.map((prod) => {
      const categoryRefs = (prod.cateogry || []).map((categoryId) => categoryIdMap[categoryId]).filter(Boolean);
      const subCategoryRefs = (prod.subCateogry || []).map((subCategoryId) => subCategoryIdMap[subCategoryId]).filter(Boolean);

      return new ProductModel({
        name: prod.name,
        brand: prod.brand,
        image: prod.image,
        cateogry: categoryRefs,
        subCateogry: subCategoryRefs,
        unit: prod.unit,
        stock: prod.stock,
        price: prod.price,
        discount: prod.discount,
        description: prod.description,
        more_details: prod.more_details,
        published: prod.published === undefined ? true : prod.published,
      }).save();
    })
  );

  console.log(`Seed completed: ${categoryDocs.length} categories, ${subCategoryDocs.length} subcategories, ${productDocs.length} products inserted.`);
  await mongoose.disconnect();
  process.exit(0);
};

main().catch((error) => {
  console.error('Seed failed:', error);
  process.exit(1);
});
