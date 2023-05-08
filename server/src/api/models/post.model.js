import mongoose from "mongoose";
const { Schema } = mongoose;
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    address: {
      province: { type: String, required: true },
      district: { type: String, required: true },
      wards: { type: String, required: true },
      addressDetails: { type: String, required: true },
    },
    images: [
      {
        url: { type: String },
        contentType: { type: String },
      },
    ],
    otherInfo: { type: Number },
    status: {
      code: { type: Number, default: 2 },
      mess: { type: String, minlength: 10 },
    },
    acreage: { type: Number, required: true },
    price: { type: Number, required: true },
    deposit: { type: Number },
    description: {
      type: String,
      required: true,
      minLength: 10,
      maxLength: 15000,
    },
    typeCategory: { type: String, required: true },
    typePost: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Post = mongoose.model("post", PostSchema);
export { Post, PostSchema };

// 0 từ chôi
// 1 xác nhận
// 2 đợi duyệt
// 9 tin bị ẩn
