import nodeMailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodeMailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const mailer = {
  sendMail: (to, subject, text, htmlContent) => {
    const mailOptions = {
      from: process.env.MAIL_FROM_ADDRESS,
      to: to,
      subject: subject,
      text: text,
      html: htmlContent,
    };
    return transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error: ", error);
      } else {
        console.log("Email sent: ", info.response);
      }
    });
  },
};

export default mailer;
