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
    password: { type: String, required: true },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    isAdmin: {
      type: String,
      default: "user",
    },
    avatar: {
      type: String,
      required: false,
    },
    post: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("user", UserSchema);
export default User;
