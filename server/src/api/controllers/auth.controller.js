import { User, Post } from '../models/index.js';
import errorFunction from '../utils/errorFunction.js';
import jwt from 'jsonwebtoken';
import { encryptionPassword } from '../utils/encryption.js';
import { response } from 'express';
import bycrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import mailer from '../utils/mailer.js';
import generateToken from '../utils/generateToken.js';
import uploads from '../utils/cloudinary.js';
import fs from 'fs';

let refreshTokens = [];

const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const verificationLink = `${process.env.LOCAL_URL}auth/verify-email/${verificationToken}`;
    await mailer.sendMail(
      email,
      'XÁC THỰC EMAIL',
      'Email gửi với mục đích yêu cầu người dùng xác thực email nhập vào lúc đăng ký',
      `<p>Cảm ơn bạn đã đăng ký tài khoản!</p>
          <p>Để hoàn tất quá trình đăng ký, vui lòng nhấn vào liên kết sau để xác thực địa chỉ email của bạn:</p>
          <a href="${verificationLink}">Xác thực tài khoản</a>
          <p>Lưu ý: Liên kết trên chỉ có hiệu lực trong vòng 30 phút. Sau 30 phút bạn cần gửi yêu cầu xác thực email lại!</p>`
    );
  } catch (error) {
    console.error(error);
  }
};

const userControllers = {
  //REGISTER
  registerAccount: async (req, res, next) => {
    try {
      const { firstName, lastName, avatar, email, phone, password } = req.body;

      // Check account already exists?
      const existingPhone = await User.findOne({
        $or: [{ email }, { phone }],
      }).lean(true);
      if (existingPhone) {
        res.status(403);
        return res.json(errorFunction(true, 403, 'User Already Exist'));
      } else {
        const hashedPassword = await encryptionPassword(password);
        const user = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
          phone,
          avatar,
        });

        // Generate verification token
        const verificationToken = generateToken.verificationToken(user);

        // Send verification email
        await sendVerificationEmail(user.email, verificationToken);
        res
          .status(201)
          .json(
            errorFunction(
              false,
              201,
              'An Email sent to your account please check your email and verify'
            )
          );

        // if (req.user?.role === "admin") {
        //   // Nếu là admin thì tạo user mới và thông báo thành công
        //   res
        //     .status(201)
        //     .json(
        //       errorFunction(false, 201, "New account registration successful")
        //     );
        // } else {
        //   //Nếu người dùng đăng ký 1 tài khoản login luôn tại đây
        //   req.body.emailOrPhone = email;
        //   return userControllers.login(req, res, next);
        // }
      }
    } catch (error) {
      res.status(500);
      return res
        .status(500)
        .json(errorFunction(true, 500, 'Internal server error'));
    }
  },

  // Verify email
  verifyEmail: async (req, res, next) => {
    try {
      const { token } = req.params;
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json('User not found');
      }

      // Update user
      user.isVerified = true;
      await user.save();

      res
        .status(200)
        .json(errorFunction(false, 200, 'Email verified successfully'));
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(errorFunction(true, 500, 'Internal server error'));
    }
  },

  // LOGIN
  login: async (req, res, next) => {
    try {
      const { emailOrPhone, password } = req.body;

      //Check emailOrPhone to identify logged in user with email or phone number
      User.findOne({
        $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
      }).then((user) => {
        if (user) {
          // check password
          bycrypt.compare(
            password,
            user.password,
            async function (err, result) {
              if (err) {
                res.status(400).json(errorFunction(true, 400, 'Bad request'));
              }
              if (result) {
                // check account lock status
                if (user.isLocked === true) {
                  return res
                    .status(405)
                    .json(errorFunction(false, 405, 'Account has been locked'));
                }

                // Check if user is verified
                if (!user.isVerified) {
                  // Generate verification token
                  const verificationToken =
                    generateToken.verificationToken(user);

                  // Send verification email
                  await sendVerificationEmail(user.email, verificationToken);

                  // Return error message
                  return res
                    .status(401)
                    .json(
                      errorFunction(
                        true,
                        401,
                        'Account not verified. Please check your email for verification link.'
                      )
                    );
                }

                // create access token and refresh token
                const accessToken = generateToken.accessToken(user);
                const refreshToken = generateToken.refreshToken(user);
                refreshTokens.push(refreshToken);

                // Set cookies
                res.cookie('refreshToken', refreshToken, {
                  httpOnly: true,
                  secure: true, // When deploy will reset to true
                  path: '/',
                  sameSite: 'strict',
                });
                res.set('Authorization', `Bearer ${accessToken}`);

                // Returns access token and user information
                const { password, ...rest } = user._doc;

                res.status(200).json(
                  errorFunction(false, 200, 'Login Success', {
                    user: { ...rest },
                    accessToken,
                  })
                );
              } else {
                res
                  .status(401)
                  .json(
                    errorFunction(true, 401, 'Password does not matched!!!')
                  );
              }
            }
          );
        } else {
          res.status(400).json(errorFunction(true, 400, 'User not found'));
        }
      });
    } catch (err) {
      return res
        .status(500)
        .json(errorFunction(true, 500, 'Internal server error'));
    }
  },

  resendVerificationEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      // check the email is not empty
      if (!email || email.trim() === '') {
        return res
          .status(400)
          .json(errorFunction(true, 400, 'Please enter a valid email'));
      }

      // Check if email is valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json(errorFunction(true, 400, 'Invalid email format'));
      }

      // Check if account exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json(errorFunction(true, 404, 'User not found'));
      }

      // Check verified user
      if (user.isVerified === true) {
        return res
          .status(409)
          .json(
            errorFunction(
              true,
              409,
              'The email you entered has already been verified. Please check again.'
            )
          );
      }

      // Generate new verification token
      const verificationToken = generateToken.verificationToken(user);

      // Send new verification email
      await sendVerificationEmail(user.email, verificationToken);

      res
        .status(200)
        .json(
          errorFunction(false, 200, 'New verification email sent successfully!')
        );
    } catch (error) {
      console.error(error);
      res.status(500).json(errorFunction(true, 500, 'Internal server error'));
    }
  },

  loginWithOAuth: async (req, res) => {},

  requestRefreshToken: async (req, res) => {
    // Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json('Refresh token is not valid');
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
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
      });
      return res.status(200).json({ accessToken: newAccessToken });
    });
  },

  // GET USER BY ID
  getUserById: async (req, res) => {
    try {
      const userResult = await User.findById(req.params.id).populate({
        path: 'favourite',
        populate: {
          path: 'userId',
          select: 'phone lastName avatar firstName',
        },
      });
      // '_id title images status price'
      if (userResult) {
        const { password, ...others } = userResult._doc;
        res.status(200).json({
          statusCode: 200,
          ...others,
        });
      } else {
        res.status(204).json({
          statusCode: 204,
          message: 'This user Id have not in the database',
          user: {},
        });
      }
    } catch (error) {
      res.status(500).json(errorFunction(true, 500, 'Bad Request'));
    }
  },

  // GET ALL USERS
  getAllUsers: async (req, res) => {
    try {
      const {
        pageSize = 11,
        pageNumber = 1,
        role = '',
        userByColumn,
        userByDirection = 'desc',
      } = req.query;
      const filter = {
        $and: [
          {
            role: {
              $regex: role,
              $options: '$i',
            },
          },
        ],
      };
      const filterUsers = await User.find(filter)
        .populate('favourite', '_id title images status price')
        .sort(`${userByDirection === 'asc' ? '' : '-'}${userByColumn}`)
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
          message: 'No results',
          users: [],
        });
      }
    } catch (error) {
      res.status(500);
      return res.json(errorFunction(true, 500, error.massage));
    }
  },

  // EDIT USER
  editUser1: (req, res, next) => {
    try {
      const userId = req.params.id;
      const isBodyEmpty = Object.keys(req.body).length;
      if (isBodyEmpty === 0) {
        return res.status(403).send({
          statusCode: 403,
          massage: 'Body request can not empty!',
        });
      }
      User.findByIdAndUpdate(userId, req.body).then((data) => {
        if (data) {
          res.status(200).json(errorFunction(false, 200, 'Successfully'));
        } else {
          res
            .status(204)
            .json(
              errorFunction(
                false,
                204,
                'This User Id have not in the database.'
              )
            );
        }
      });
    } catch (error) {
      return res.status(500).json(errorFunction(true, 500, 'Bad Request'));
    }
  },
  editUser: async (req, res, next) => {
    try {
      const userId = req.params.id;
      // const isBodyEmpty = Object.keys(req.body).length;
      // console.log('407', isBodyEmpty)
      // if (isBodyEmpty === 0) {
      //   return res.status(403).send(errorFunction(false, 403, "Body request can not empty!"));
      // }

      if (req.file) {
        // Lấy đường dẫn tạm thời của ảnh đã tải lên
        const tempFilePath = req.file.path;

        //upload  ảnh lên Cloudinary
        const result = await uploads(tempFilePath, 'avatars');

        // Xóa ảnh tạm thời sau khi đã upload lên Cloudinary
        fs.unlinkSync(tempFilePath);

        // Lấy url của ảnh đã được upload lên Cloudinary
        const imageUrl = result.url;

        // Cập nhật thông tin vào cơ sở dữ liệu, bao gồm đường dẫn
        const updatedUserData = {
          ...req.body,
          avatar: imageUrl,
        };
        User.findByIdAndUpdate(userId, updatedUserData, { new: true }).then(
          (data) => {
            if (data) {
              res.status(200).json(errorFunction(false, 200, 'Successfully'));
            } else {
              res
                .status(204)
                .json(
                  errorFunction(
                    false,
                    204,
                    'This User Id have not in the database.'
                  )
                );
            }
          }
        );
      } else {
        // Nếu không có tệp ảnh được tải lên, chỉ cập nhật thông tin người dùng vào cơ sở dữ liệu
        User.findByIdAndUpdate(userId, req.body, { new: true }).then((data) => {
          if (data) {
            res.status(200).json(errorFunction(false, 200, 'Successfully'));
          } else {
            res
              .status(204)
              .json(
                errorFunction(
                  false,
                  204,
                  'This User Id have not in the database.'
                )
              );
          }
        });
      }
    } catch (error) {
      return res.status(500).json(errorFunction(true, 500, 'Bad Request'));
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
          .json(errorFunction(false, 404, 'User not found'));
      }
      if (user.isLocked === true) {
        return res
          .status(406)
          .json(errorFunction(false, 406, 'The user has been locked', user));
      }
      user.isLocked = true;
      await user.save();

      mailer.sendMail(
        user.email,
        'THÔNG BÁO VỀ VIỆC KHÓA TÀI KHOẢN',
        'Thật đáng tiếc!',
        '<div style=" color: #721c24; padding: 1rem;">' +
          '<h2 style="font-size: 1.5rem; margin-bottom: 1rem;">Tài khoản của bạn đã bị khóa</h2>' +
          '<h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông tin tài khoản bị khóa</h3>' +
          '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
          '<li style="font-weight: bold;">Email:</li>' +
          '<li>' +
          user.email +
          '</li>' +
          '<li style="font-weight: bold;">Số điện thoại:</li>' +
          '<li>' +
          user.phone +
          '</li>' +
          '</ul>' +
          '<h3 style="font-size: 1rem; margin-bottom: 0.5rem;">Thông tin liên hệ: </h3>' +
          '<ul style="list-style-type: none; padding: 0; margin: 0;">' +
          '<li style="font-weight: bold;">Hotline: 0934968108</li>' +
          '<li style="font-weight: bold;">Email: HI.U@abc.com or phamquoctai@deptrai.com</li>' +
          '</ul>' +
          '</div>'
      );

      res
        .status(200)
        .json(
          errorFunction(false, 200, 'User locked successfully!!!', user.phone)
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
        return res.json(errorFunction(false, 403, 'User is not exist'));
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
                .json(errorFunction(false, 404, 'Bad request'));
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
            errorFunction(false, 403, 'Password does not match!')
          );
        }
      }
    } catch (error) {
      res.status(400);
      return res.json(errorFunction(false, 400, 'Bad request'));
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
        return res.json(errorFunction(false, 403, 'User does not exists!'));
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
              .json(errorFunction(false, 404, 'Bad request'));
          } else {
            mailer.sendMail(
              req.body.email,
              'Cung cấp lại mật khẩu Omoday',
              'Đừng quên nữa nha :>',
              '<p>Đây là email tự động được gửi từ Omoday. Mật khẩu của bạn đã được cập nhật.</p><ul><li>Username: ' +
                existingUser.phone +
                '</li><li>Email: ' +
                existingUser.email +
                '</li><li>Password: ' +
                randomPassword +
                '</li></ul>' +
                '<p>Để đảm bảo an toàn thông tin cá nhân, vui lòng đổi mật khẩu.</p>' +
                '<p>Trân trọng!</p>'
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
      console.log('debug', error);
      res.json(errorFunction(true, 404, 'Bad request'));
    }
  },

  // LOGOUT
  logout: async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res
      .status(200)
      .json(errorFunction(false, 200, 'Logout successful!!!'));
  },
};

export default userControllers;
