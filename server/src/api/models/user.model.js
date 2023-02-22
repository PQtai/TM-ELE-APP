import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
    password: { 
      type: String, 
      required: true 
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
    isLocked: {
      type: Boolean,
      default: false,
    },
    evaluate: {
      type: Number,
      maximum: 5,
      default: 0,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
export default User;
