import mongoose from "mongoose";
const product_schema = new mongoose.Schema({
    name : {
        type : String,

    },
    image : {
        type : Array,
        default : []
    },
    cateogry :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'cateogry'
        }
    ],
    subCateogry : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'subcateogry'
        }
    ],
    unit : {
        type : String,
        default : ""
    },
    stock : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        default : 0
    },
    discount : {
        type : Number,
        default : 0
    },
    description : {
        type : String,
        default : ""
    },
    more_details : {
       type : Object,
       default : {}
    },
    published : {
        type : Boolean,
        default : true
    }
}, { timestamps : true }) 
const ProductModel = mongoose.model("product", product_schema)

export default ProductModel