import mongoose from 'mongoose';
const cartProductSchema = new mongoose.Schema({
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    quantity : {
        type : Number,
        default : 1
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
}, {
    timestamps : true
})

const CartProductModel = mongoose.model("cartproduct", cartProductSchema)

export default CartProductModel