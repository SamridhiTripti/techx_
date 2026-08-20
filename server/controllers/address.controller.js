import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export async function createAddressController(request, response) {
    try {
        const userId = request.userId;
        const { address_line, city, state, pin_code, pincode, country, mobile } = request.body;
        const resolvedPinCode = pin_code || pincode;

        if (!address_line || !city || !state || !resolvedPinCode || !country || !mobile) {
            return response.status(400).json({
                message: "All address fields are required.",
                error: true,
                success: false
            });
        }

        const newAddress = new AddressModel({
            address_line,
            city,
            state,
            pin_code: resolvedPinCode,
            country,
            mobile,
            status: true,
            userId
        });
        const savedAddress = await newAddress.save();

        // Link address to user
        await UserModel.findByIdAndUpdate(userId, {
            $push: { address_details: savedAddress._id }
        });

        return response.json({
            message: "Address added successfully.",
            error: false,
            success: true,
            data: savedAddress
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

export async function getAddressController(request, response) {
    try {
        const userId = request.userId;
        const allAddresses = await AddressModel.find({ userId }).sort({ createdAt: -1 });
        return response.json({
            message: "Addresses fetched.",
            error: false,
            success: true,
            data: allAddresses
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

export async function updateAddressController(request, response) {
    try {
        const userId = request.userId;
        const { _id, address_line, city, state, pin_code, country, mobile } = request.body;

        const updated = await AddressModel.findOneAndUpdate(
            { _id, userId },
            { address_line, city, state, pin_code, country, mobile },
            { new: true }
        );

        if (!updated) {
            return response.status(404).json({ message: "Address not found.", error: true, success: false });
        }

        return response.json({
            message: "Address updated successfully.",
            error: false,
            success: true,
            data: updated
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}

export async function disableAddressController(request, response) {
    try {
        const userId = request.userId;
        const { _id } = request.body;

        const updated = await AddressModel.findOneAndUpdate(
            { _id, userId },
            { status: false },
            { new: true }
        );

        // Remove from user's address_details array
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { address_details: _id }
        });

        return response.json({
            message: "Address removed.",
            error: false,
            success: true,
            data: updated
        });
    } catch (error) {
        return response.status(500).json({ message: error.message || error, error: true, success: false });
    }
}
