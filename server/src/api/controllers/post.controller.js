import { Post } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';
import fs from 'fs';
import uploads from '../utils/cloudinary.js';
// import path from 'path';

const postControllers = {
  // [Get]/all
  index: async (req, res, next) => {
    try {
      const { page = 1, pageSize = 10 } = req.query;
      const posts = await Post.find({ 'status.code': 1 })
        .sort({ createdAt: -1 })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
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
      const uploader = async (path) => await uploads(path, 'Posts');
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
        userId: req.user.id,
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
  // [Patch]/post/editStatus/:id
  updatePostStatus: async (req, res, next) => {
    try {
      const { postId, code, mess } = req.body;
      const role = req.user.role;
      if (role === 'admin') {
        const post = await Post.findOneAndUpdate(
          { _id: postId },
          { status: { code, mess } },
          { new: true }
        );
        res
          .status(201)
          .json(
            errorFunction(false, 201, 'Update post status is succesfully', post)
          );
      } else {
        const post = await Post.findOne({ _id: postId });
        if (!post) {
          return res
            .status(404)
            .json(errorFunction(false, 404, 'Post id is not found'));
        }
        const currCode = post.status.code;
        if ((code === 9 || code === 1) && (currCode === 9 || currCode === 1)) {
          post.status.code = code;
          const newPost = await post.save();
          res
            .status(201)
            .json(
              errorFunction(
                false,
                201,
                'Update post status is succesfully',
                newPost
              )
            );
        } else {
          res
            .status(403)
            .json(
              errorFunction(true, 403, 'You are not authorized to do this')
            );
        }
      }
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
    }
  },
  // [Patch]/post/edit/:id
  updatePost: async (req, res, next) => {
    try {
      const { postId, role, status, ...rest } = req.body;
      const post = await Post.findOneAndUpdate({ _id: postId }, { ...rest });
      res
        .status(201)
        .json(errorFunction(false, 201, 'Update post is succesfully', post));
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, error.message));
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
