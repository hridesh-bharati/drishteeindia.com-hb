const nodemailer = require("nodemailer");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = '../../../../photos';
    if (!fs.existsSync(uploadDir)){
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024*100000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|mp3|mp4|3gp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: File upload only supports the following filetypes - " + filetypes);
  }
});


const sendMail = async (email, title, message) => {
  return new Promise(async (resolve, reject) => {
    try {
      const aEmail = process.env.EMAIL;
      const aPassword = process.env.EMAILPASSWORD;
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: aEmail,
          pass: aPassword,
        },
        tls: {
          rejectUnauthorized: false  // Bypass certificate validation (use only in development)
        }
      
      });
      const mailOption = {
        from: aEmail,
        to: email,
        subject: title,
        html: `${message}`,
      };
      transporter.sendMail(mailOption, function (error, info) {
        if (error) {
          console.log(error);
          reject(false);
        } else {
          resolve(true);
        }
      });
    } catch (error) {
      console.log(error);
      reject(false);
    }
  });
};
const passwordGenerator = (length) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*-_=+";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
const generateOtp = () => {
  const otpValue = Math.floor(100000 + Math.random() * 900000);
  return otpValue.toString();
};
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero indexed, so we add 1
  const day = String(today.getDate()).padStart(2, "0");

  // Construct the ISO 8601 date string with UTC offset
  const isoDateString = `${year}-${month}-${day}T00:00:00.000+00:00`;

  return new Date(isoDateString);
}


const getHtmlEmailpage = (otp) => {
  return ` <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification - Drishtee Institute of Technology</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
        }
        .header {
            background-color: #003366;
            color: #ffffff;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            font-size: 20px;
            color: #003366;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 10px 0;
        }
        .otp-container {
            background-color: #eaf4f4;
            border: 1px solid #cce5e5;
            border-radius: 5px;
            padding: 15px;
            display: inline-block;
            font-size: 18px;
            color: #003366;
            margin: 20px 0;
        }
        .footer {
            font-size: 14px;
            color: #666;
            margin-top: 20px;
        }
        .footer a {
            color: #003366;
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container-fluid">
        <div class="header">
            <h1>Drishtee Institute of Technology</h1>
        </div>
        <div class="content">
            <h2>OTP Verification</h2>
            <p>Dear Admin,</p>
            <p>We received a request to verify your identity. Please use the OTP below to complete the verification process:</p>
            <div class="otp-container">
                <strong>OTP: ${otp}</strong>
            </div>
            <p>This OTP is valid for the next 2 minutes.</p>
        </div>
        <div class="footer">
            <p>Best Regards,</p>
            <p>The Drishtee Institute of Technology Team</p>
            <p>For any inquiries or issues, please visit our <a href="http://localhost:300/support">Support Center</a>.</p>
        </div>
    </div>
</body>
</html> `;
};
module.exports = {
  sendMail,
  passwordGenerator,
  generateOtp,
  getTodayDate,
  getHtmlEmailpage,
  upload
};