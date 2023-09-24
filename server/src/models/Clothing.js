import mongoose from "mongoose"

const ClothingSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true,
    },
    description: {
        type: String,
        // required: true,
    },
    category: {
        type: String,
        // required: true,
    },
    location: {
        type: String,
        // required: true,
    },
    price: {
        type: Number,
        // required: true,
        min: 0,
    },
    images: [
        {
            type: String,
        },
    ] ,
    reviewIds: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "review",
        },
    ],
    userOwner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true
    }
})



export const ClothingModel = mongoose.model("clothing", ClothingSchema)