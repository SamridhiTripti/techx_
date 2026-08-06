import ProductModel from '../models/product.model.js';
import { isMongoConnected } from '../config/connectDB.js';
import { fallbackProducts } from '../utils/fallbackData.js';

let productStore = [...fallbackProducts];

export async function getProductController(request, response) {
  try {
    if (isMongoConnected) {
      const data = await ProductModel.find({ published: true }).lean();
      return response.json({ message: 'Products fetched successfully.', error: false, success: true, data });
    }

    return response.json({ message: 'Products fetched from fallback data.', error: false, success: true, data: productStore });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function getProductByCategoryController(request, response) {
  try {
    const { categoryId, id } = request.body || {};
    const resolvedCategoryId = categoryId || id;

    if (isMongoConnected) {
      const data = await ProductModel.find({ published: true, cateogry: resolvedCategoryId }).lean();
      return response.json({ message: 'Products fetched successfully.', error: false, success: true, data });
    }

    const data = productStore.filter((item) => item.cateogry.includes(resolvedCategoryId));
    return response.json({ message: 'Products fetched from fallback data.', error: false, success: true, data });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function getProductByCategoryAndSubCategoryController(request, response) {
  try {
    const { categoryId, subCategoryId, category, subcategory } = request.body || {};
    const resolvedCategoryId = categoryId || category;
    const resolvedSubCategoryId = subCategoryId || subcategory;

    if (isMongoConnected) {
      const data = await ProductModel.find({ published: true, cateogry: resolvedCategoryId, subCateogry: resolvedSubCategoryId }).lean();
      return response.json({ message: 'Products fetched successfully.', error: false, success: true, data });
    }

    const data = productStore.filter((item) => item.cateogry.includes(resolvedCategoryId) && item.subCateogry.includes(resolvedSubCategoryId));
    return response.json({ message: 'Products fetched from fallback data.', error: false, success: true, data });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function getProductDetailsController(request, response) {
  try {
    const { _id, productId } = request.body || {};
    const resolvedId = _id || productId;

    if (isMongoConnected) {
      const data = await ProductModel.findOne({ _id: resolvedId, published: true }).lean();
      return response.json({ message: 'Product fetched successfully.', error: false, success: true, data });
    }

    const data = productStore.find((item) => item._id === resolvedId) || null;
    return response.json({ message: 'Product fetched from fallback data.', error: false, success: true, data });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function searchProductController(request, response) {
  try {
    const { search } = request.body || {};
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    if (isMongoConnected) {
      const data = await ProductModel.find({ published: true, ...query }).lean();
      return response.json({ message: 'Products fetched successfully.', error: false, success: true, data });
    }

    const data = productStore.filter((item) => item.name.toLowerCase().includes((search || '').toLowerCase()));
    return response.json({ message: 'Products fetched from fallback data.', error: false, success: true, data });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function createProductController(request, response) {
  try {
    const payload = request.body;

    if (isMongoConnected) {
      const item = await ProductModel.create(payload);
      return response.json({ message: 'Product created successfully.', error: false, success: true, data: item });
    }

    const item = { _id: `prod_${Date.now()}`, ...payload };
    productStore = [item, ...productStore];
    return response.json({ message: 'Product created successfully.', error: false, success: true, data: item });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function updateProductController(request, response) {
  try {
    const { _id, ...payload } = request.body;
    if (! _id) {
      return response.status(400).json({ message: 'Product id is required.', error: true, success: false });
    }

    if (isMongoConnected) {
      const updated = await ProductModel.findByIdAndUpdate(_id, payload, { new: true });
      return response.json({ message: 'Product updated successfully.', error: false, success: true, data: updated });
    }

    productStore = productStore.map((item) => (item._id === _id ? { ...item, ...payload } : item));
    return response.json({ message: 'Product updated successfully.', error: false, success: true, data: productStore.find((item) => item._id === _id) });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}

export async function deleteProductController(request, response) {
  try {
    const { _id } = request.body;
    if (! _id) {
      return response.status(400).json({ message: 'Product id is required.', error: true, success: false });
    }

    if (isMongoConnected) {
      await ProductModel.findByIdAndDelete(_id);
      return response.json({ message: 'Product deleted successfully.', error: false, success: true });
    }

    productStore = productStore.filter((item) => item._id !== _id);
    return response.json({ message: 'Product deleted successfully.', error: false, success: true });
  } catch (error) {
    return response.status(500).json({ message: error.message || error, error: true, success: false });
  }
}
