import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js"
import { ClothingModel } from '../models/Clothing.js'
import { ReviewModel } from '../models/Reviews.js';
import 'dotenv/config'

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const response = await UserModel.find({})
        res.json(response);
    } catch (err) {
        res.json(err)
    }
})

router.get("/:userID", async(req, res) => {
    try {
        const getUser = await UserModel.findById(req.params.userID)
        res.json(getUser);
    } catch (err) {
        res.json(err)
    }
})

router.put("/:userID", async(req, res) => {
    try {
        const userID = req.params.userID;
        const { username, email, currentPassword, newPassword } = req.body;

        const user = await UserModel.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Password incorrect or missing. We require your current password to make any changes. " });
        }

        // Construct an object with the fields to update
        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (newPassword) updatedFields.password = await bcrypt.hash(newPassword, 10);

        if (newPassword) {
            updatedFields.password = await bcrypt.hash(newPassword, 10);
        }

        // Use findByIdAndUpdate to update the user
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID,
            updatedFields,
            { new: true } // Return the updated user after the update
        );

        res.json(updatedUser);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      }
});

router.delete("/:userID", async(req, res) => {
    try {
        const userID = req.params.userID;
        const user = await UserModel.findById(userID);
        console.log("deleting...")
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
          
          const associatedClothingItems = await ClothingModel.find({ userOwner: user._id });
          const reviewsByUser = await ReviewModel.find({ reviewer: user._id });
          
          for (const reviews of reviewsByUser) {
                await ReviewModel.findByIdAndRemove(reviews._id)
          }
         
          for (const clothingItem of associatedClothingItems) {
            const associatedReviews = await ReviewModel.find({ _id: clothingItem.reviewIds });
        
           // Delete associated reviews of clothing item
            for (const review of associatedReviews) {
              await ReviewModel.findByIdAndRemove(review._id)
        
            }
           
            await ClothingModel.findByIdAndRemove(clothingItem._id);
          }

          await UserModel.findByIdAndRemove(userID);
          res.json({ message: "User, clothing, and reviews deleted successfully." });
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: "Internal Server Error" });
        }
})




export { router as userRouter };
