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
      required: true,
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
      enum: ["user", "admin"],
      default: "user",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dzn7taii7/image/upload/v1682177170/avartar-default/images_wx8wbt.png",
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
    averageRating: {
      type: Number,
      minimum: 1,
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
<<<<<<< HEAD
        ref: "chat",
=======
        ref: "conversation",
>>>>>>> master
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
export default User;
