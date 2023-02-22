import mongoose from 'mongoose';
const { Schema } = mongoose;
const CommentSchema = new Schema(
  {
    evaluate: { type: Number, min: 1, max: 5, require: true },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    des: { type: 'string', minlength: 2, maxlength: 50 },
    message: { type: 'string', minlength: 2, maxlength: 50, default: '' },
  },
  { timestamps: true }
);
const Comment = mongoose.model('comment', CommentSchema);
export { Comment, CommentSchema };

// message: {
//     from : {type : "userPost/userComment"},
//     text : {type : "string" , minlength : 2 , maxlength : 50}
// }
