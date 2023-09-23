import express from 'express'
import mongoose from 'mongoose'
import { ClothingModel } from "../models/Clothing.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from './auth.js';

const router = express.Router();

router.get("/", async(req, res) => {
    try {
        const response = await ClothingModel.find({})
        res.json(response);
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

router.get("/:clothesId", async(req, res) => {
    try {
        // const {id} = req.params;
        const getClothing = await ClothingModel.findById(req.params.clothesId);
       

        res.json({getClothing})
    } catch (err) {
        res.json(err);
    }
})

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

export { router as clothingRouter } 