import { Post } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';
import fs from 'fs';
import path from 'path';

const postControllers = {
  // [Get]/all
  index: async (req, res, next) => {
    try {
      const posts = await Post.find({});
      res
        .status(200)
        .json(errorFunction(false, 200, 'Find post is succesfully', posts));
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
  // [Get]/post/:id
  show: async (req, res, next) => {
    try {
      const post = await Post.findOne({ _id: req.params.id });
      res
        .status(201)
        .json(
          errorFunction(false, 201, 'Find detail post is succesfully', post)
        );
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
  //[Post]file/upload
  upload: async (req, res, next) => {
    try {
      const __dirname = path.resolve();
      const _url = req.protocol + '://' + req.get('host');
      const listImg = req.files.map((img) => {
        return {
          url:
            _url +
            fs.readFileSync(
              path.join(__dirname + '/src/api/upload/' + img.filename)
            ),
          contentType: img.mimetype,
        };
      });
      const post = await Post.create({
        ...req.body,
        images: listImg,
      });
      post.save().then((newPost) => {
        res
          .status(201)
          .json(
            errorFunction(false, 201, 'Create post is succesfully', newPost)
          );
      });
    } catch (error) {
      res.status(500).json(error.message);
    }
  },
};
export default postControllers;
