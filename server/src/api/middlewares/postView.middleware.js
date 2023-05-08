import { Post } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
const postViews = async (req, res, next) => {
  try {
    const viewsCount = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true, upsert: true }
    );
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json(errorFunction(true, 500, "Something went wrong!!"));
  }
};

export default postViews;
