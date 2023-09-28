import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import { authRouter } from "./src/routes/auth.js"
import { clothingRouter } from "./src/routes/clothing.js"
import { userRouter } from './src/routes/users.js'


import multer from 'multer'
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
mongoose.connect(process.env.MONGODB_URI )
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const app = express()

app.use(express.json());
app.use(cors());


// app.get("/", (req, res) => {
//     res.setHeader("Access-Control-Allow-Credentials", "true");
// })
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use("/auth", authRouter)
app.use("/clothing", clothingRouter)
app.use("/users", userRouter)


const photosMiddleware = multer({dest:'uploads/'})

app.post(`/upload`, photosMiddleware.array('photos', 100), (req, res) => {
   
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length -1]
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        console.log(newPath);
        // When pushing to main, make sure to keep the uploads/ one.
        uploadedFiles.push(newPath.replace('uploads/', ''));

        // Uploads\\ is for it to work on local
        // uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    
    res.json(uploadedFiles);        
})



const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



