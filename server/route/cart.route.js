import { Router } from 'express'
import auth from '../middleware/auth.js'
import {
  createCartItemController,
  getCartItemController,
  updateCartItemQtyController,
  deleteCartItemController,
} from '../controllers/cart.controller.js'

const cartRouter = Router()

cartRouter.post('/create', auth, createCartItemController)
cartRouter.get('/get', auth, getCartItemController)
cartRouter.put('/update-qty', auth, updateCartItemQtyController)
cartRouter.delete('/delete-cart-item', auth, deleteCartItemController)

export default cartRouter
