const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: { type: String, required: true },
    // avatar: { type: String, required: true },
    rating :{type:Number, required:true, min:1, max:5},
    comments: { type: String, required: true },
    createdAt:{type:Date, default:Date.now}
  },
  { timestamps: true }
);

const Feedback = mongoose.model("feedback", FeedbackSchema);
module.exports = Feedback;