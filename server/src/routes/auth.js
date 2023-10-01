import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js"
import 'dotenv/config'

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const user = await UserModel.findOne({ username})

    if(user) {
        return res.json({ message: "User already exists!"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, email, password: hashedPassword, isRegistration: true, })
    await newUser.save()

    res.json({message: "User Registered Successfully"});
})

router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    const lowercaseUsername = username.toLowerCase();

    const user = await UserModel.findOne({ username: lowercaseUsername })

    if(!user) {
        return res.status(400).json({ message: "User does not exist"});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({ message: "Username or password incorrect"});
    }

    const token = jwt.sign( {id: user._id }, process.env.USER_SECRET);
    res.json({ token, userID: user._id })
})

export { router as authRouter };

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        jwt.verify(token, process.env.USER_SECRET, (err) => {
            if(err) return res.sendStatus(403);

            // if no errors, user can proceed next
            next();
        })
    } else {
        res.sendStatus(401);
    }
}