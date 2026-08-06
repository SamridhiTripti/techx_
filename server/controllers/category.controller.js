import CategoryModel from '../models/cateogry.model.js';
import { isMongoConnected } from '../config/connectDB.js';
import { fallbackCategories } from '../utils/fallbackData.js';

let categoryStore = [...fallbackCategories];

export async function getCategoryController(request, response) {
  try {
    if (isMongoConnected) {
      const data = await CategoryModel.find({}).lean();
      return response.json({ message: 'Categories fetched successfully.', error: false, success: true, data });
    }

    return response.json({ message: 'Categories fetched from fallback data.', error: false, success: true, data: categoryStore });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function addCategoryController(request, response) {
  try {
    const { name, image } = request.body;
    const payload = { name: name || '', image: image || '' };

    if (isMongoConnected) {
      const item = await CategoryModel.create(payload);
      return response.json({ message: 'Category created successfully.', error: false, success: true, data: item });
    }

    const item = { _id: `cat_${Date.now()}`, ...payload };
    categoryStore = [item, ...categoryStore];
    return response.json({ message: 'Category created successfully.', error: false, success: true, data: item });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function updateCategoryController(request, response) {
  try {
    const { _id, name, image } = request.body;
    if (! _id) {
      return response.status(400).json({ message: 'Category id is required.', error: true, success: false });
    }

    if (isMongoConnected) {
      const updated = await CategoryModel.findByIdAndUpdate(_id, { ...(name && { name }), ...(image && { image }) }, { new: true });
      return response.json({ message: 'Category updated successfully.', error: false, success: true, data: updated });
    }

    categoryStore = categoryStore.map((item) => (item._id === _id ? { ...item, ...(name && { name }), ...(image && { image }) } : item));
    return response.json({ message: 'Category updated successfully.', error: false, success: true, data: categoryStore.find((item) => item._id === _id) });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function deleteCategoryController(request, response) {
  try {
    const { _id } = request.body;
    if (! _id) {
      return response.status(400).json({ message: 'Category id is required.', error: true, success: false });
    }

    if (isMongoConnected) {
      await CategoryModel.findByIdAndDelete(_id);
      return response.json({ message: 'Category deleted successfully.', error: false, success: true });
    }

    categoryStore = categoryStore.filter((item) => item._id !== _id);
    return response.json({ message: 'Category deleted successfully.', error: false, success: true });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}
