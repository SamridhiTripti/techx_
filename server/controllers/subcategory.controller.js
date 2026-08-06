import SubCategoryModel from '../models/subcateogry.model.js';
import { isMongoConnected } from '../config/connectDB.js';
import { fallbackSubCategories } from '../utils/fallbackData.js';

let subCategoryStore = [...fallbackSubCategories];

export async function getSubCategoryController(request, response) {
  try {
    const { categoryId } = request.body || {};

    if (isMongoConnected) {
      const query = categoryId ? { cateogry: categoryId } : {};
      const data = await SubCategoryModel.find(query).lean();
      return response.json({ message: 'Subcategories fetched successfully.', error: false, success: true, data });
    }

    const data = categoryId
      ? subCategoryStore.filter((item) => item.cateogry.includes(categoryId))
      : subCategoryStore;

    return response.json({ message: 'Subcategories fetched from fallback data.', error: false, success: true, data });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function createSubCategoryController(request, response) {
  try {
    const { name, image, cateogry } = request.body;
    const payload = { name: name || '', image: image || '', cateogry: cateogry || [] };

    if (isMongoConnected) {
      const item = await SubCategoryModel.create(payload);
      return response.json({ message: 'Subcategory created successfully.', error: false, success: true, data: item });
    }

    const item = { _id: `sub_${Date.now()}`, ...payload };
    subCategoryStore = [item, ...subCategoryStore];
    return response.json({ message: 'Subcategory created successfully.', error: false, success: true, data: item });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function updateSubCategoryController(request, response) {
  try {
    const { _id, name, image, cateogry } = request.body;
    if (! _id) {
      return response.status(400).json({ message: 'Subcategory id is required.', error: true, success: false });
    }

    if (isMongoConnected) {
      const updated = await SubCategoryModel.findByIdAndUpdate(_id, { ...(name && { name }), ...(image && { image }), ...(cateogry && { cateogry }) }, { new: true });
      return response.json({ message: 'Subcategory updated successfully.', error: false, success: true, data: updated });
    }

    subCategoryStore = subCategoryStore.map((item) => (item._id === _id ? { ...item, ...(name && { name }), ...(image && { image }), ...(cateogry && { cateogry }) } : item));
    return response.json({ message: 'Subcategory updated successfully.', error: false, success: true, data: subCategoryStore.find((item) => item._id === _id) });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function deleteSubCategoryController(request, response) {
  try {
    const { _id } = request.body;
    if (! _id) {
      return response.status(400).json({ message: 'Subcategory id is required.', error: true, success: false });
    }

    if (isMongoConnected) {
      await SubCategoryModel.findByIdAndDelete(_id);
      return response.json({ message: 'Subcategory deleted successfully.', error: false, success: true });
    }

    subCategoryStore = subCategoryStore.filter((item) => item._id !== _id);
    return response.json({ message: 'Subcategory deleted successfully.', error: false, success: true });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}
