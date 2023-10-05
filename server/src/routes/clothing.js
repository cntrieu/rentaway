import express from 'express'
import mongoose from 'mongoose'
import { ClothingModel } from "../models/Clothing.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from './auth.js';
import { ReviewModel } from '../models/Reviews.js';

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const { q } = req.query
 
        if (q) {
            // If 'q' parameter is provided, apply filtering. 'i' for case-insensitive matching
            const filteredClothing = await ClothingModel.find({ 
                $or: [
                    { title: { $regex: q, $options: 'i' } },
                    { category: { $regex: q, $options: 'i' } },
                    { description: { $regex: q, $options: 'i' } },
                    { location: { $regex: q, $options: 'i' } }
                ]});
      
            res.json(filteredClothing);
        } else {
            // If 'q' parameter is not provided, retrieve all clothing items
            const allClothing = await ClothingModel.find({});
            res.json(allClothing);
        }
    } catch (err) {
        res.json(err)
    }
})

router.post("/", verifyToken, async(req, res) => {
    const clothing = new ClothingModel(req.body)

    try {
        const response = await clothing.save();
        res.json(response);
    } catch (err) {
        res.json(err)
    }
})

router.put("/", verifyToken, async(req, res) => {
    try {
        const clothing = await ClothingModel.findById(req.body.clothesID)
        const user = await UserModel.findById(req.body.userID)

        if (!clothing) {
            return res.status(404).json({ error: "Clothing item not found" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        user.savedClothes.push(clothing);
        await user.save();

        res.json({savedClothes: user.savedClothes});
    } catch (err) {
        res.json(err)
    }
})

router.put("/:clothesID", verifyToken, async(req, res) => {
    try {
        const { userOwner, title, description, location, category, price } = req.body;

        const clothing = await ClothingModel.findById(req.params.clothesID);
        const user = await UserModel.findById(userOwner);

        if (!clothing) {
            return res.status(404).json({ error: "Clothing item not found" });
        }

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the clothing item's fields if provided in the request body
        if (title) clothing.title = title;
        if (description) clothing.description = description;
        if (location) clothing.location = location;
        if (category) clothing.category = category;
        if (price) clothing.price = price;

        await clothing.save();

        res.json({ updatedClothing: clothing });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
})

router.get("/:clothesId", async(req, res) => {
    try {

        const getClothing = await ClothingModel.findById(req.params.clothesId);
       
        res.json({getClothing})
    } catch (err) {
        res.json(err);
    }
})

router.delete("/:clothesId", verifyToken, async(req, res) => {
    try {
        const deleteClothing = await ClothingModel.findByIdAndRemove(req.params.clothesId);

        if (!deleteClothing) {
            return res.status(404).json({ message: "Clothing not found" });
          }

        res.json({ message: "Clothing deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal Server Error" });
    }
})

// Saved Clothes

router.get("/savedClothes/ids/:userId", async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        res.json({ savedClothes: user?.savedClothes})
    } catch (err) {
        res.json(err);
    }
})

router.get("/savedClothes/:userId", async(req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        const savedClothes = await ClothingModel.find({
            _id: { $in: user.savedClothes}
        })
        res.json({ savedClothes })
    } catch (err) {
        res.json(err);
    }
})


router.delete("/savedClothes/:userId/:clothesId", async(req, res) => {
    try {
        const userId = req.params.userId;
        const deleteClothesID = req.params.clothesId

        const user = await UserModel.findById(userId);

        if(!user) {
            return res.status(404).json({error: "User not found" })
        }

        const updateSavedClothes = user.savedClothes.filter(
            (savedClothesId) => savedClothesId != deleteClothesID
        )

        user.savedClothes = updateSavedClothes;

        await user.save();
        res.json({ savedClothes: updateSavedClothes });
    } catch (err) {
        res.json(err);
    }
})


// Review of Clothing
router.get("/:clothesId/reviews", async(req, res) => {
    try {
        const clothingId = req.params.clothesId;

        const clothingItem = await ClothingModel.findById(clothingId);

        if (!clothingItem) {
            return res.status(404).json({ error: "Clothing item not found" });
        }

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
        console.log(saveReview)
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


export { router as clothingRouter } 