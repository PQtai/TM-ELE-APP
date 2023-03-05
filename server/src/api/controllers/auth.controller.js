import { User, Post } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import jwt from "jsonwebtoken";
import { encryptionPassword } from "../utils/encryption.js";
import { response } from "express";
import bycrypt from "bcryptjs";
import nodemailer from "nodemailer";
import mailer from "../utils/mailer.js"
import generateToken from "../utils/generateToken.js";

let refreshTokens = [];

const userControllers = {
  //REGISTER
  // ở hàm register cần nghiên cứu thêm về tính năng verify email.
  // tạo 1 biến hashedEmail dùng bcrypt để hash email sau đó so sánh
  // sử dụng nodeMailer để gửi email và so sánh, nếu trùng thì gửi token verify...
  registerAccount: async (req, res, next) => {
    try {
      const { firstName, lastName,  avatar, email, phone, password } =
        req.body;

      // Check account already exists?
      const existingPhone = await User.findOne({
        $or: [{ email }, { phone }],
      }).lean(true);
      if (existingPhone) {
        res.status(403);
        return res.json(errorFunction(true, 403, "User Already Exist"));
      } else {
        const hashedPassword = await encryptionPassword(password);
        const newUser = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
          phone,
          avatar
        });
        // const newUser = await User.create(req.body)
        if (newUser) {
          res.status(201);
          return res.json(errorFunction(false, 201, "User Created", newUser));
        } else {
          res.status(403);
          return res.json(errorFunction(false, 403, "Error Creating User"));
        }
      }
    } catch (error) {
      res.status(500);
      return res.json(errorFunction(true, 500, "Error Adding User"));
    }
  },

  // // GENERATE ACCESS TOKEN
  // generateAccessToken: (user) => {
  //   return jwt.sign(
  //     {
  //       id: user.id,
  //       role: user.role,
  //     },
  //     process.env.JWT_ACCESSTOKEN_KEY,
  //     { expiresIn: "3d" }
  //   );
  // },

  // // GENERATE REFRESH TOKEN
  // generateRefreshToken: (user) => {
  //   return jwt.sign(
  //     {
  //       id: user.id,
  //       role: user.role,
  //     },
  //     process.env.JWT_REFRESHTOKEN_KEY,
  //     { expiresIn: "30d" }
  //   );
  // },

  // LOGIN
  login: async (req, res) => {
    try {
      // var username = req.body.username
      // var email = req.body.email
      // var password = req.body.password
      const { emailOrPhone, password } = req.body;

      //Check emailOrPhone to identify logged in user with email or phone number
      User.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      }).then((user) => {
        if (user) {
          // check account lock status
          if (user.isLocked === true) {
            return res.status(405).json(errorFunction(false, 405, 'Account has been locked'));
          }
          // check password
          bycrypt.compare(password, user.password, function (err, result) {
            if (err) {
              res.json(errorFunction(true, 400, "Bad request"));
            }
            if (result) {
              // create access token and refresh token
              const accessToken = generateToken.accessToken(user);
              const refreshToken = generateToken.refreshToken(user);
              refreshTokens.push(refreshToken);

              // Set cookies
              res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: true, // When deploy will reset to true
                path: "/",
                sameSite: "strict",
              });

              // Returns access token and user information
              const { password, ...others } = user._doc;
              res.json({
                massage: "Login success",
                ...others,
                accessToken,
              });
            } else {
              res.json(
                errorFunction(false, 401, "Password does not matched!!!")
              );
            }
          });
        } else {
          res.json(errorFunction(false, 400, "User not found"));
        }
      });
    } catch (err) {
      res.status(500);
      return res.json(errorFunction(true, 500, "Bad request"));
    }
  },

  loginWithOAuth: async (req, res) => {
    
  },

  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_ACCESSTOKEN_KEY, (err, user) => {
      if (err) {
        return res.json(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      // Create a new access token and refresh token
      const newAccessToken = generateToken.accessToken(user);
      const newRefreshToken = generateToken.refreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const userResult = await User.findById(req.params.id).populate(
        "posts",
        "_id title images status price"
      );
      if (userResult) {
        const { password, ...others } = userResult._doc;
        res.status(200).json({
          statusCode: 200,
          ...others,
        });
      } else {
        res.json({
          statusCode: 204,
          message: "This user Id have not in the database",
          user: {},
        });
      }
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, "Bad Request"));
    }
  },

  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const result = await User.find({}).populate(
        "posts",
        "_id title images status price"
      );
      if (result.length > 0) {
        res.status(200).json({
          totalUsers: result.length,
          users: result.reverse(),
        });
      } else {
        res.status(200).json({
          message: "No results",
          users: [],
        });
      }
    } catch (error) {
      res.status(500);
      return res.json(errorFunction(true, 500, "Bad Request"));
    }
  },

  // EDIT USER
  editUser: (req, res, next) => {
    try {
      const userId = req.params.id;
      const isBodyEmpty = Object.keys(req.body).length;
      if (isBodyEmpty === 0) {
        return res.send({
          statusCode: 403,
          massage: "Body request can not empty!",
        });
      }
      User.findByIdAndUpdate(userId, req.body).then((data) => {
        if (data) {
          res.status(200).json(errorFunction(false, 200, "Successfully"));
        } else {
          res.json(
            errorFunction(false, 204, "This User Id have not in the database")
          );
        }
      });
    } catch (error) {
      return res.status(500).json(errorFunction(true, 500, "Bad Request"));
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
          "</div>",)

      // const mailOptions = {
      //   from: "minhhieu.tran.mcs@gmail.com",
      //   to: user.email,
      //   subject: "THÔNG BÁO VỀ VIỆC KHÓA TÀI KHOẢN",
      //   text: "Buồn quá!",
      //   html:
      //     '<div style=" color: #721c24; padding: 1rem;">' +
      //     '<h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Tài khoản của bạn đã bị khóa</h2>' +
      //     '<h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông tin tài khoản bị khóa</h3>' +
      //     '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
      //     '<li style="font-weight: bold;">Email:</li>' +
      //     "<li>" +
      //     user.email +
      //     "</li>" +
      //     '<li style="font-weight: bold;">Số điện thoại:</li>' +
      //     "<li>" +
      //     user.phone +
      //     "</li>" +
      //     "</ul>" +
      //     '<h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông tin liên hệ: </h3>' +
      //     '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
      //     '<li style="font-weight: bold;">Hotline: 0934968108</li>' +
      //     '<li style="font-weight: bold;">Email: HI.U@abc.com or phamquoctai@deptrai.com</li>' +
      //     "</ul>" +
      //     "</div>",
      // };

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     console.log("error: ", error);
      //   } else {
      //     console.log("Email sent: ", info.response);
      //   }
      // });
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
      const userId = req.body.id;
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
              return res.json(errorFunction(false, 404, "Bad request"));
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
            return res.json(errorFunction(false, 404, "Bad request"));
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
              )

            // const mailOptions = {
            //   from: "minhhieu.tran.mcs@gmail.com",
            //   to: req.body.email,
            //   subject: "Cung cấp lại mật khẩu Omoday",
            //   text: "That was easy!",
            //   html: 
            //     "<p>Đây là email tự động được gửi từ Omoday. Mật khẩu của bạn đã được cập nhật.</p><ul><li>Username: " +
            //     existingUser.phone +
            //     "</li><li>Email: " +
            //     existingUser.email +
            //     "</li><li>Password: " +
            //     randomPassword +
            //     "</li></ul>" +
            //     "<p>Để đảm bảo an toàn thông tin cá nhân, vui lòng đổi mật khẩu.</p>" +
            //     "<p>Trân trọng!</p>",
            // };

            // transporter.sendMail(mailOptions, function (error, info) {
            //   if (error) {
            //     console.log("error: ", error);
            //   } else {
            //     console.log("Email sent: ", info.response);
            //   }
            // });
            return res.json(
              errorFunction(false, 200, "Updated user's password successfully!")
            );
          }
        });
      }
    } catch (error) {
      console.log("debug", error);
      res.json(errorFunction(true, 404, "Bad request"));
    }
  },

  // LOGOUT
  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
    return res.status(200).json(errorFunction(false, 200, "Logout successful!!!"))
  }
};

export default userControllers;
