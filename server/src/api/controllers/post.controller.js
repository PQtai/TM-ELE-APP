import { Post } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";

const postControllers = {
  index: async (req, res, next) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  // [Get]/user/:id
  show: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
  //[Post]file/upload
  upload: async (req, res, next) => {
    try {
      const url = req.protocol + "://" + req.get("host");
      const listImg = req.files.map((img) => {
        return (img.filename = url + "/public/" + img.filename);
      });
      const post = await Post.create({
        ...req.body,
        image: listImg,
      });
      post.save().then((newPost) => {
        res
          .status(201)
          .json(
            errorFunction(false, 201, "Create post is succesfully", newPost)
          );
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
export default postControllers;
