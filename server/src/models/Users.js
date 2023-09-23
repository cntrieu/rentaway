import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: function () {
            // Apply 'required' constraint only during registration or else every email will be enforced even in situations not working with user data
            return this.isRegistration;
        },
        match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    savedClothes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "clothing"
    }],
    isRegistration: {
        type: Boolean, 
        default: false, // Initialize as false
    },
})

export const UserModel = mongoose.model("users", UserSchema)