import mongoose from 'mongoose';
const { Schema } = mongoose;
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
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
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);
const Post = mongoose.model('post', PostSchema);
export { Post, PostSchema };

// 0 từ chôi
// 1 xác nhận
// 2 đợi duyệt
// 9 tin bị ẩn
