import { Post } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';
import fs from 'fs';
import uploads from '../utils/cloudinary.js';
// import path from 'path';

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
      const uploader = async (path) => await uploads(path, 'Images');
      const files = req.files;
      const listImg = [];
      for (const file of files) {
        const { path, mimetype } = file;
        const newPath = await uploader(path);
        const _link = newPath.url;
        console.log('_link', _link);
        fs.unlinkSync(path);
        listImg.push({
          url: _link,
          contentType: mimetype,
        });
      }
      console.log('listImg', listImg);

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
  // /[Delete]/delete
  delete: async (req, res, next) => {
    Post.deleteMany()
      .then(function () {
        res
          .status(201)
          .json(errorFunction(false, 201, 'delete all post is succesfully'));
      })
      .catch(function (error) {
        res.status(500).json(error.message);
      });
  },
};
export default postControllers;
