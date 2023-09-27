import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true,
    },
    clothingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clothing", 
        required: false, 
      },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: String,
    timestamp: {
        type: String,
    },
})

export const ReviewModel = mongoose.model("review", ReviewSchema)