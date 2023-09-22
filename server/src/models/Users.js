import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    savedClothes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "clothing"
    }]
})

export const UserModel = mongoose.model("users", UserSchema)