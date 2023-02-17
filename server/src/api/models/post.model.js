import mongoose from 'mongoose';
const { Schema } = mongoose;
const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true, unique: true },
    images: [
      {
        url: Buffer,
        contentType: { type: String },
      },
    ],
    otherInfo: { type: Number },
    status: {
      code: { type: Number, default: 2 },
      mess: { type: String, default: 'Đợi duyệt' },
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
    evaluate: { type: Number, max: 5, default: 0 },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'user',
    // },
  },
  { timestamps: true }
);
const Post = mongoose.model('post', PostSchema);
export { Post, PostSchema };

// 0 từ chôi
// 1 xác nhận
// 2 đợi duyệt
