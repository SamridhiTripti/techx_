import mongoose from "mongoose";
const cateogry_Schema = new mongoose.Schema({
    name : {
        type : String,
        default : ""
    },
    image : {
        type : String,
        default : ""
    },
}, { timestamps : true })

const CategoryModel = mongoose.model("cateogry", cateogry_Schema)

export default CategoryModel