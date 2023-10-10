import express from 'express'
import { ConversationModel } from "../models/Conversation.js"
const router = express.Router();

// new conv
router.post("/" , async (req, res) => {
    const newConversation = new ConversationModel({
        members: [req.body.senderID, req.body.receiverID]
    })
    console.log(req.body)
    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation)
    } catch(err) {
        res.status(500).json(err)
    }
})

//get conv of user

router.get("/:userId", async(req, res) => {
    try {
        const conversation = await ConversationModel.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversation)
    } catch(err) {
        res.status(500).json(err)
    }
}
)

export { router as conversationRouter };

