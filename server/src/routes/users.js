import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js"
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




export { router as userRouter };
