import express from 'express'
import mongoose from 'mongoose'
import { ClothingModel } from "../models/Clothing.js";
import { UserModel } from "../models/Users.js";
import { ReviewModel } from '../models/Reviews.js';
import { verifyToken } from './auth.js';

const router = express.Router();

router.get("/:clothesId/reviews", async(req, res) => {
    try {
        const clothingId = req.params.clothesId;

        const clothingItem = await ClothingModel.findById(clothingId);

        if (!clothingItem) {
            return res.status(404).json({ error: "Clothing item not found" });
        }

        console.log(clothingItem)
        const reviews = await ReviewModel.find({
            _id: { $in: clothingItem.reviewIds }
        })

        res.json(reviews);
    } catch (err) {
        res.json(err)
    }
})

router.post("/:clothesId/reviews", async(req, res, next) => {
    const { clothesId } = req.params;
    const review = new ReviewModel(req.body)

    try {
        const saveReview = await review.save()
        console.log("saveReview", saveReview)

        const clothingItem = await ClothingModel.findById(clothesId);
        
        if(!clothingItem) {
            return res.status(404).json({ error: "Clothing item not found" });
        }

        clothingItem.reviewIds.push(saveReview._id)
        await clothingItem.save();
    
        res.json(saveReview)
    } catch (err) {
        res.json(err)
    }
})


export { router as reviewsRouter } 