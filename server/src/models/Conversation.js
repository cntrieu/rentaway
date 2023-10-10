import mongoose from "mongoose"

const ConversationSchema = new mongoose.Schema(
    {
      members: {
        type: Array,
      },
    },
    { timestamps: true }
);
  

export const ConversationModel = mongoose.model("conversation", ConversationSchema)