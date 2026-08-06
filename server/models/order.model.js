import mongoose from 'mongoose';
const orderSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    orderId : {
        type : String,
        required : [true, "provide order id"],
        unique : true
    },
    productId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'product'
    },
    product_details :{
        
        name : String,
        image : Array,
        price : Number,
    },
    paymentId : {
        type : String,
        default : "" 
    },
    payment_status : {
        type : String,
        default : ""
    },
    delivery_address : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'address'
    },
    subtotalAmt : {
        type : Number,
        default : 0
    },
    totalAmt : {
        type : Number,
        default : 0
    },
    invoice_recieved : {
        type : String,
        default : false
    }
}, {
    timestamps : true})

const OrderModel = mongoose.model("order", orderSchema)

export default OrderModel