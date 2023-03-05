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
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: "user",
    },
    avatar: {
      type: String,
      required: false,
    },
    favourite: [
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
    googleId: {
      type: String,
      required: false,
    },
    facebookId: {
      type: String,
      required: false,
    },
    conversations: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "conversation",
      },
  ],
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
export default User;
