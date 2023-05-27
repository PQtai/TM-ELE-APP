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
        ref: "chat",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    reviewsGiven: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "review",
      },
    ],
  },
  { timestamps: true }
);

UserSchema.methods.calculateAverageRating = async function () {
  try {
    const reviews = await mongoose.model("review").find({
      reviewedUser: this._id,
    });

    if (reviews.length === 0) {
      this.averageRating = 0;
    } else {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      this.averageRating = (totalRating / reviews.length).toFixed(1);
    }

    await this.save();
  } catch (error) {
    throw new Error("Error calculating average rating");
  }
};
const User = mongoose.model("user", UserSchema);
export default User;
