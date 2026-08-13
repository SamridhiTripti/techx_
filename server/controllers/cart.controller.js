import CartProductModel from '../models/cartproduct.model.js'
import ProductModel from '../models/product.model.js'
import UserModel from '../models/user.model.js'

export async function createCartItemController(request, response) {
  try {
    const { productId } = request.body || {}
    const userId = request.userId

    if (!productId) {
      return response.status(400).json({ success: false, error: true, message: 'Product id is required.' })
    }

    const product = await ProductModel.findById(productId)
    if (!product) {
      return response.status(404).json({ success: false, error: true, message: 'Product not found.' })
    }

    const existingCartItem = await CartProductModel.findOne({ userId, product: productId })
    if (existingCartItem) {
      existingCartItem.quantity += 1
      await existingCartItem.save()
      return response.json({ success: true, error: false, message: 'Cart updated successfully.', data: existingCartItem })
    }

    const cartItem = await CartProductModel.create({ userId, product: productId, quantity: 1 })
    await UserModel.findByIdAndUpdate(userId, { $addToSet: { Shopping_cart: cartItem._id } })

    return response.json({ success: true, error: false, message: 'Product added to cart successfully.', data: cartItem })
  } catch (error) {
    return response.status(500).json({ success: false, error: true, message: error.message || error })
  }
}

export async function getCartItemController(request, response) {
  try {
    const userId = request.userId
    const cartItems = await CartProductModel.find({ userId }).populate('product').lean()

    const formattedItems = cartItems.map((item) => ({
      ...item,
      productId: item.product,
      product: undefined,
    }))

    return response.json({ success: true, error: false, message: 'Cart items fetched successfully.', data: formattedItems })
  } catch (error) {
    return response.status(500).json({ success: false, error: true, message: error.message || error })
  }
}

export async function updateCartItemQtyController(request, response) {
  try {
    const { _id, qty } = request.body || {}
    const userId = request.userId

    if (!_id || typeof qty !== 'number') {
      return response.status(400).json({ success: false, error: true, message: 'Cart item id and qty are required.' })
    }

    if (qty < 1) {
      await CartProductModel.findOneAndDelete({ _id, userId })
      return response.json({ success: true, error: false, message: 'Cart item removed successfully.' })
    }

    const updated = await CartProductModel.findOneAndUpdate(
      { _id, userId },
      { $set: { quantity: qty } },
      { new: true }
    ).populate('product')

    if (!updated) {
      return response.status(404).json({ success: false, error: true, message: 'Cart item not found.' })
    }

    return response.json({ success: true, error: false, message: 'Cart item quantity updated successfully.', data: { ...updated.toObject(), productId: updated.product } })
  } catch (error) {
    return response.status(500).json({ success: false, error: true, message: error.message || error })
  }
}

export async function deleteCartItemController(request, response) {
  try {
    const { _id } = request.body || {}
    const userId = request.userId

    if (!_id) {
      return response.status(400).json({ success: false, error: true, message: 'Cart item id is required.' })
    }

    const deleted = await CartProductModel.findOneAndDelete({ _id, userId })
    if (!deleted) {
      return response.status(404).json({ success: false, error: true, message: 'Cart item not found.' })
    }

    return response.json({ success: true, error: false, message: 'Cart item removed successfully.' })
  } catch (error) {
    return response.status(500).json({ success: false, error: true, message: error.message || error })
  }
}
