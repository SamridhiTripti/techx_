import mongoose from "mongoose";
const addressSchema = new mongoose.Schema({
    address_line : {
        type: String,
        default : ""
    },
    city : {
        type: String,
        default : ""
    },
    state : {
        type: String,
        default : ""
    },
    pin_code : {
        type: String,
        default : ""
    },
    country : {
        type: String,
        default : ""
    },
    mobile : {
        type: Number,
        default : null
    },
    userId : {
        type: String,
        default : ""
    },
    status : {
        type: Boolean,
        default : true
    }
}, { timestamps: true })

const AddressModel = mongoose.model("address", addressSchema)

export default AddressModel