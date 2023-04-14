import { User, Post } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import jwt from "jsonwebtoken";
import { encryptionPassword } from "../utils/encryption.js";
import { response } from "express";
import bycrypt from "bcryptjs";
import nodemailer from "nodemailer";
import mailer from "../utils/mailer.js";
import generateToken from "../utils/generateToken.js";
import uploads from "../utils/cloudinary.js";
import fs from "fs";

const userControllers = {
  // GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const userResult = await User.findById(req.params.id);
      if (userResult) {
        const {
          password,
          phone,
          email,
          role,
          favourite,
          conversations,
          isVerified,
          ...others
        } = userResult._doc;
        res
          .status(200)
          .json(
            errorFunction(false, 200, "Get user successfully", { ...others })
          );
      } else {
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, "Bad Request"));
    }
  },

  getCurrentUser: async (req, res) => {
    try {
      User.findById(req.params.id)
        .select("-password -role")
        .populate("favourite", "_id title images status price")
        .then((user) => {
          res
            .status(200)
            .json(
              errorFunction(false, 200, "Get current user successfully", user)
            );
        })
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, "Bad Request"));
    }
  },

  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const {
        pageSize = 11,
        pageNumber = 1,
        role = "",
        userByColumn,
        userByDirection = "desc",
      } = req.query;
      const filter = {
        $and: [
          {
            role: {
              $regex: role,
              $options: "$i",
            },
          },
        ],
      };
      const filterUsers = await User.find(filter)
        .populate("favourite", "_id title images status price")
        .sort(`${userByDirection === "asc" ? "" : "-"}${userByColumn}`)
        .limit(pageSize * 1)
        .skip((pageNumber - 1) * pageSize);

      const allUsers = await User.find(filter);
      let totalPage = 0;
      if (allUsers.length % pageSize === 0) {
        totalPage = allUsers.length / pageSize;
      } else {
        totalPage = parseInt(allUsers.length / pageSize) + 1;
      }
      if (allUsers.length > 0) {
        res.status(200).json({
          totalPage: totalPage,
          totalUsers: allUsers.length,
          users:
            userByDirection && userByColumn
              ? filterUsers
              : filterUsers.reverse(),
        });
      } else {
        res.status(200).json({
          message: "No results",
          users: [],
        });
      }
    } catch (error) {
      res.status(500);
      return res.json(errorFunction(true, 500, error.massage));
    }
  },

  // EDIT USER

  editUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      req.body = JSON.parse(req.body.datas);
      if (req.file) {
        console.log(132, req.file);
        // Lấy đường dẫn tạm thời của ảnh đã tải lên
        const tempFilePath = req.file.path;

        //upload ảnh lên Cloudinary
        const result = await uploads(tempFilePath, "avatars");
        console.log(result);

        // Xóa ảnh tạm thời sau khi đã upload lên Cloudinary
        fs.unlinkSync(tempFilePath);

        // Lấy url của ảnh đã được upload lên Cloudinary
        const imageUrl = result.url;

        // Check nếu URL của ảnh mới tải lên giống với URL của ảnh cũ đã lưu trong DB
        const userData = await User.findById(userId);
        if (userData.avatar === imageUrl) {
          return res
            .status(400)
            .json(errorFunction(false, 400, "Image already exists!"));
        }

        // Cập nhật thông tin vào DB
        const updatedUserData = {
          ...req.body,
          avatar: imageUrl,
        };

        User.findByIdAndUpdate(userId, updatedUserData, { new: true }).then(
          (data) => {
            if (data) {
              res
                .status(200)
                .json(
                  errorFunction(false, 200, "Add avatar successfully", data)
                );
            } else {
              res
                .status(204)
                .json(
                  errorFunction(
                    false,
                    204,
                    "This User Id have not in the database."
                  )
                );
            }
          }
        );
      } else {
        // Nếu không có ảnh, chỉ cập nhật vào DB
        const isBodyEmpty = Object.keys(req.body).length;
        if (isBodyEmpty === 0) {
          return res
            .status(403)
            .send(errorFunction(false, 403, "Body request can not empty!"));
        }
        User.findByIdAndUpdate(userId, req.body, { new: true }).then((data) => {
          if (data) {
            res.status(200).json(errorFunction(false, 200, "Successfully"));
          } else {
            res
              .status(204)
              .json(
                errorFunction(
                  false,
                  204,
                  "This User Id have not in the database."
                )
              );
          }
        });
      }
    } catch (error) {
      console.log(197, error);
      return res.status(500).json(errorFunction(true, 500, "Bad Request"));
    }
  },

  updateFavourite: async (req, res, next) => {
    try {
      const { userId, postId } = req.body;
      if (userId && postId) {
        const user = Promise.resolve(User.findById(userId));
        const post = Promise.resolve(Post.findById(postId));
        Promise.all([user, post]).then((datas) => {
          if (datas[0] && datas[1] && !datas[0].favourite.includes(postId)) {
            datas[0].favourite.push(postId);
            const saveUser = async () => {
              const newUser = await datas[0].save();
              return res
                .status(201)
                .json(
                  errorFunction(
                    false,
                    201,
                    'Tin đã được đưa vào danh sách theo giõi!!!',
                    newUser
                  )
                );
            };
            saveUser();
          } else if (datas[0].favourite.includes(postId)) {
            const index = datas[0].favourite.indexOf(postId);
            datas[0].favourite.splice(index, 1);
            const saveUser = async () => {
              const newUser = await datas[0].save();
              return res
                .status(201)
                .json(
                  errorFunction(
                    false,
                    201,
                    'Đã huỷ theo giõi tin này!!!',
                    newUser
                  )
                );
            };
            saveUser();
          }
        });
      }
    } catch (error) {
      return res.status(500).json(errorFunction(true, 500, 'Bad Request'));
    }
  },

  // DISABLE USER
  lockUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res
          .status(404)
          .json(errorFunction(false, 404, "User not found"));
      }
      if (user.isLocked === true) {
        return res
          .status(406)
          .json(errorFunction(false, 406, "The user has been locked", user));
      }
      user.isLocked = true;
      await user.save();

      mailer.sendMail(
        user.email,
        "THÔNG BÁO VỀ VIỆC KHÓA TÀI KHOẢN",
        "Thật đáng tiếc!",
        '<div style=" color: #721c24; padding: 1rem;">' +
          '<h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Tài khoản của bạn đã bị khóa</h2>' +
          '<h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông tin tài khoản bị khóa</h3>' +
          '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
          '<li style="font-weight: bold;">Email:</li>' +
          "<li>" +
          user.email +
          "</li>" +
          '<li style="font-weight: bold;">Số điện thoại:</li>' +
          "<li>" +
          user.phone +
          "</li>" +
          "</ul>" +
          '<h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông tin liên hệ: </h3>' +
          '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
          '<li style="font-weight: bold;">Hotline: 0934968108</li>' +
          '<li style="font-weight: bold;">Email: HI.U@abc.com or phamquoctai@deptrai.com</li>' +
          "</ul>" +
          "</div>"
      );

      res
        .status(200)
        .json(
          errorFunction(false, 200, "User locked successfully!!!", user.phone)
        );
    } catch (err) {
      next(err);
    }
  },

  // CHANGE PASSWORD
  changePassword: async (req, res) => {
    try {
      const userId = req.params.id;
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        res.status(403);
        return res.json(errorFunction(false, 403, "User is not exist"));
      } else {
        // Compare oldPassword vs newPassword in DB
        const encryptedPassword = await bycrypt.compareSync(
          req.body.oldPassword,
          existingUser.password
        );
        if (encryptedPassword) {
          // Hash new password
          const hashedPassword = await encryptionPassword(req.body.newPassword);
          //Body request
          const request = {
            password: hashedPassword,
          };
          User.findByIdAndUpdate(userId, request, {
            useFindAndModify: false,
          }).then((data) => {
            if (!data) {
              return res
                .status(404)
                .json(errorFunction(false, 404, "Bad request"));
            } else {
              res.status(200);
              return res.json(
                errorFunction(
                  true,
                  200,
                  "Updated user's password successfully!"
                )
              );
            }
          });
        } else {
          res.status(403);
          return res.json(
            errorFunction(false, 403, "Password does not match!")
          );
        }
      }
    } catch (error) {
      res.status(400);
      return res.json(errorFunction(false, 400, "Bad request"));
    }
  },

  // FORGOT/RESET PASSWORD
  forgotPassword: async (req, res) => {
    try {
      const existingUser = await User.findOne({
        email: req.body.email,
      }).lean(true);
      if (!existingUser) {
        res.status(403);
        return res.json(errorFunction(false, 403, "User does not exists!"));
      } else {
        // Random a new password
        const randomPassword = Math.random().toString(36).slice(2, 10);
        // Get userId from object user's info
        const userId = existingUser._id.valueOf();
        // Hash new password
        const hashedPassword = await encryptionPassword(randomPassword);
        // Body request
        const request = {
          password: hashedPassword,
        };

        User.findByIdAndUpdate(userId, request, {
          useFindAndModify: false,
        }).then((data) => {
          if (!data) {
            return res
              .status(404)
              .json(errorFunction(false, 404, "Bad request"));
          } else {
            mailer.sendMail(
              req.body.email,
              "Cung cấp lại mật khẩu Omoday",
              "Đừng quên nữa nha :>",
              "<p>Đây là email tự động được gửi từ Omoday. Mật khẩu của bạn đã được cập nhật.</p><ul><li>Username: " +
                existingUser.phone +
                "</li><li>Email: " +
                existingUser.email +
                "</li><li>Password: " +
                randomPassword +
                "</li></ul>" +
                "<p>Để đảm bảo an toàn thông tin cá nhân, vui lòng đổi mật khẩu.</p>" +
                "<p>Trân trọng!</p>"
            );

            return res
              .status(200)
              .json(
                errorFunction(
                  false,
                  200,
                  "Updated user's password successfully!"
                )
              );
          }
        });
      }
    } catch (error) {
      res.json(errorFunction(true, 404, "Bad request"));
    }
  },
};

export default userControllers;
