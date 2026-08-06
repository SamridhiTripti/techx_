import mongoose from "mongoose";
const SubcateogrySchema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
    cateogry : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'cateogry'
        }
    ]
}, { timestamps : true })

const SubCategoryModel = mongoose.model("subcateogry", SubcateogrySchema)

export default SubCategoryModel