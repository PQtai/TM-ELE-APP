import { User, Post } from "../models/index.js";
import errorFunction from "../utils/errorFunction.js";
import jwt from "jsonwebtoken";
import { encryptionPassword } from "../utils/encryption.js";
import { response } from "express";
import bycrypt from "bcryptjs";
import nodemailer from "nodemailer";
import mailer from "../utils/mailer.js";
import generateToken from "../utils/generateToken.js";

let refreshTokens = [];
const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const verificationLink = `${process.env.LOCAL_URL}/auth/verify-email/${verificationToken}`;
    console.log(`verificationLink: ${verificationLink}`);
    await mailer.sendMail(
      email,
      "XÁC THỰC EMAIL",
      "Email gửi với mục đích yêu cầu người dùng xác thực email nhập vào lúc đăng ký",
      `<p>Cảm ơn bạn đã đăng ký tài khoản!</p>
            <p>Để hoàn tất quá trình đăng ký, vui lòng nhấn vào liên kết sau để xác thực địa chỉ email của bạn:</p>
            <a href="${verificationLink}">Xác thực tài khoản</a>
            <p>Lưu ý: Liên kết trên chỉ có hiệu lực trong vòng 30 phút. Sau 30 phút bạn cần gửi yêu cầu xác thực email lại!</p>`
    );
  } catch (error) {
    console.error(error);
  }
};

const authControllers = {
  //REGISTER
  registerAccount: async (req, res, next) => {
    try {
      const { firstName, lastName, avatar, email, phone, password } = req.body;

      // Check account already exists?
      const existingPhone = await User.findOne({
        $or: [{ email }, { phone }],
      }).lean(true);
      if (existingPhone) {
        res.status(409);
        return res.json(errorFunction(true, 409, "User Already Exist"));
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
              "An Email sent to your account please check your email and verify"
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
        .json(errorFunction(true, 500, "Internal server error"));
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
        return res.status(401).json("User not found");
      }

      // Update user
      user.isVerified = true;
      await user.save();

      res
        .status(200)
        .json(errorFunction(false, 200, "Email verified successfully"));
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal server error"));
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
                res.status(400).json(errorFunction(true, 400, "Bad request"));
              }
              if (result) {
                // check account lock status
                if (user.isLocked === true) {
                  return res
                    .status(405)
                    .json(errorFunction(false, 405, "Account has been locked"));
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
                        "Account not verified. Please check your email for verification link."
                      )
                    );
                }

                // Create access token and refresh token
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
                res.set("Authorization", `Bearer ${accessToken}`);

                // Returns access token and user information
                const { password, ...rest } = user._doc;

                res.status(200).json(
                  errorFunction(false, 200, "Login Success", {
                    user: { ...rest },
                    accessToken,
                  })
                );
              } else {
                res
                  .status(401)
                  .json(
                    errorFunction(true, 401, "Password does not matched!!!")
                  );
              }
            }
          );
        } else {
          res.status(400).json(errorFunction(true, 400, "User not found"));
        }
      });
    } catch (err) {
      return res
        .status(500)
        .json(errorFunction(true, 500, "Internal server error"));
    }
  },

  resendVerificationEmail: async (req, res, next) => {
    try {
      const { email } = req.body;

      // check the email is not empty
      if (!email || email.trim() === "") {
        return res
          .status(400)
          .json(errorFunction(true, 400, "Please enter a valid email"));
      }

      // Check if email is valid format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res
          .status(400)
          .json(errorFunction(true, 400, "Invalid email format"));
      }

      // Check if account exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json(errorFunction(true, 404, "User not found"));
      }

      // Check verified user
      if (user.isVerified === true) {
        return res
          .status(409)
          .json(
            errorFunction(
              true,
              409,
              "The email you entered has already been verified. Please check again."
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
          errorFunction(false, 200, "New verification email sent successfully!")
        );
    } catch (error) {
      console.error(error);
      res.status(500).json(errorFunction(true, 500, "Internal server error"));
    }
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

  // LOGOUT
  logout: async (req, res) => {
    res.clearCookie("refreshToken");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    return res
      .status(200)
      .json(errorFunction(false, 200, "Logout successful!!!"));
  },
};

export default authControllers;
