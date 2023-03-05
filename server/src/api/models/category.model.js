import mongoose from "mongoose";
const { Schema } = mongoose;

const productCategoryChema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model('category', productCategoryChema);
export { Category, productCategoryChema };
