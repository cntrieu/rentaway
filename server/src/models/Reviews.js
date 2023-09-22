import mongoose from "mongoose"

const ReviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "users", 
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: String,
    timestamp: {
        type: Date,
        default: Date.now,
    }
})

export const ReviewModel = mongoose.model("review", ReviewSchema)