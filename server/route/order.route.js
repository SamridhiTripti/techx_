import { Router } from "express";
import {
    cashOnDeliveryOrderController,
    paymentController,
    getOrderItemsController
} from "../controllers/order.controller.js";
import auth from "../middleware/auth.js";

const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, cashOnDeliveryOrderController);
orderRouter.post("/checkout", auth, paymentController);
orderRouter.get("/order-list", auth, getOrderItemsController);

export default orderRouter;
