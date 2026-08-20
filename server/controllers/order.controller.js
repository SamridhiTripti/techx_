import OrderModel from "../models/order.model.js";
import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";
import mongoose from "mongoose";
import Stripe from "stripe";

// Helper: generate a short order ID
function generateOrderId() {
    return "TXN-" + Date.now() + "-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

// Helper: clear user's cart after order
async function clearCart(userId) {
    try {
        await CartProductModel.deleteMany({ userId: new mongoose.Types.ObjectId(userId) });
        await UserModel.findByIdAndUpdate(userId, { Shopping_cart: [] });
    } catch (e) {
        console.warn("Cart clear error:", e.message);
    }
}

export async function cashOnDeliveryOrderController(request, response) {
    try {
        const userId = request.userId;
        const { list_items, addressId, subTotalAmt, totalAmt } = request.body;

        if (!list_items || !list_items.length || !addressId) {
            return response.status(400).json({
                message: "Cart items and delivery address are required.",
                error: true,
                success: false
            });
        }

        // Create one order document per cart item
        const createdOrders = [];
        for (const item of list_items) {
            const productId = item?.productId?._id || item?.productId || item?._id;
            const productName = item?.productId?.name || item?.name || "Product";
            const productImages = item?.productId?.image || item?.image || [];
            const productPrice = item?.productId?.price || item?.price || 0;

            const order = new OrderModel({
                user: new mongoose.Types.ObjectId(userId),
                orderId: generateOrderId(),
                productId: productId ? new mongoose.Types.ObjectId(productId) : undefined,
                product_details: {
                    name: productName,
                    image: productImages,
                    price: productPrice
                },
                paymentId: "",
                payment_status: "Cash on Delivery",
                delivery_address: new mongoose.Types.ObjectId(addressId),
                subtotalAmt: subTotalAmt || totalAmt,
                totalAmt: totalAmt
            });
            const saved = await order.save();
            createdOrders.push(saved._id);
        }

        // Link orders to user & clear cart
        await UserModel.findByIdAndUpdate(userId, { $push: { orderHistory: { $each: createdOrders } } });
        await clearCart(userId);

        return response.json({
            message: "Order placed successfully! Cash on Delivery.",
            error: false,
            success: true,
            data: createdOrders
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

export async function paymentController(request, response) {
    try {
        const userId = request.userId;
        const { list_items, addressId, subTotalAmt, totalAmt } = request.body;

        if (!list_items || !list_items.length || !addressId) {
            return response.status(400).json({
                message: "Cart items and delivery address are required.",
                error: true,
                success: false
            });
        }

        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (!stripeSecretKey) {
            return response.status(503).json({
                message: "Online payment is not configured. Please use Cash on Delivery.",
                error: true,
                success: false
            });
        }

        const stripe = new Stripe(stripeSecretKey);

        const lineItems = list_items.map((item) => {
            const product = item?.productId || item;
            const name = product?.name || "Product";
            const image = product?.image?.[0] || "";
            const price = Math.round((product?.price || 0) * 100); // Stripe uses paise/cents
            const qty = item?.quantity || 1;

            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name,
                        images: image ? [image] : []
                    },
                    unit_amount: price
                },
                quantity: qty
            };
        });

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL || "http://localhost:5173"}/cancel`,
            metadata: {
                userId: userId.toString(),
                addressId: addressId.toString()
            }
        });

        return response.json({
            message: "Stripe session created.",
            error: false,
            success: true,
            id: session.id,
            url: session.url
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

export async function getOrderItemsController(request, response) {
    try {
        const userId = request.userId;
        const orders = await OrderModel.find({ user: userId })
            .sort({ createdAt: -1 })
            .populate("delivery_address");

        return response.json({
            message: "Orders fetched.",
            error: false,
            success: true,
            data: orders
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}
