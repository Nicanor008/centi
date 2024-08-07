import User from "../users/users.model";
import { jwt, mailService } from "../../services";
import { utils } from "../../helpers";
import { generateOtp, compareOtp } from "../../helpers/utils";
import userService from "../users/users.service";
import refreshTokenService from "../refreshTokens/refreshToken.service";
import sendEmail from "../../helpers/email/sendMail";

const signup = async (data, ipAddress) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email existing in system!");
  }
  const OTP = await generateOtp();

  const payload = { ...data, otp: OTP, otpLastUpdate: Date.now() };

  const user = await User.create(payload);
  const token = generateToken(user);
  const refreshToken = await generateRefreshToken(user, ipAddress);

  const html = `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #333333;
          margin: 0;
          padding: 20px;
        }
        .container {
          max-width: 600px;
          margin: auto;
          background-color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #2c3e50;
        }
        p {
          font-size: 16px;
          line-height: 1.6;
        }
        .otp {
          font-size: 24px;
          font-weight: bold;
          color: #e74c3c;
          margin: 20px 0;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #e74c3c;
          color: #ffffff !important;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          margin-top: 20px;
          font-weight: bolder;
        }
        .footer {
          margin-top: 30px;
          font-size: 12px;
          color: #999999;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Hi, ${user.firstName}</h2>
        <p>Welcome onboard.<br /><br />
        This is a ship sailing towards financial independence city. To get all the benefits at hand, kindly enter the provided code below on the Centi platform to proceed to the next cabin.</p>
        <div class="otp">${OTP}</div>
        <a href="https://centi-platform.com/login" class="button">Login</a>
        <p class="footer">If you didn't request this, you can ignore it.</p>
      </div>
    </body>
  </html>
  `

  // send mail
  await sendEmail(user.email, "Centi: Financial Account Created", html);

  const result = {
    user,
    token,
    refreshToken: refreshToken.token
  };
  return result;
};

const login = async (user, ipAddress) => {
  const token = generateToken(user);
  const refreshToken = await generateRefreshToken(user, ipAddress);
  return { user, token, refreshToken: refreshToken.token };
};

const requestOtpLogin = async email => {
  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    await User.create({ email });
  }

  const OTP = await generateOtp(email);

  const optionsEmail = {
    to: email,
    subject: "Verify OTP Login For App",
    html: `<html>
    <body>
      <h2>Verify OTP</h2>
      <p>Use this OTP to reset your password. OTP is valid for 30 second</p>
      <h3>${OTP}</h3>
    </body>
  </html>`
  };

  return sendEmail(optionsEmail);
};

const verifyOTPOnSignup = async (user, otp, ipAddress) => {
  const currentUser = await User.findOne({ email: user?.email });

  if(user?.otp !== currentUser?.otp) {
    throw new Error("Invalid or Wrong OTP");
  }

  return login(user, ipAddress);
};

const handleCompareOtp = async (email, otpRequest) => {
  const isValidOtp = await compareOtp(email, otpRequest);

  if (!isValidOtp) {
    throw new Error("Otp is invalid!");
  }

  const user = await User.findOne({ email });
  const access_token = generateToken(user);

  return { access_token };
};

const logout = async token => {
  // const result = await deviceTokenService.deleteDeviceTokenByToken(token);
  return { message: "Logout was successfully" };
};

const checkEmailIsValid = async email => {
  const count = await User.countDocuments({ email });
  let result = { isValid: true, message: "Your email is valid!" };
  if (count > 0) {
    result = { isValid: false, message: "Your email already exists!" };
  }
  return result;
};

const checkUsernameIsValid = async username => {
  const count = await User.countDocuments({ username });
  let result = { isValid: true, message: "Your username is valid!" };
  if (count > 0) {
    result = { isValid: false, message: "Your username already exists!" };
  }
  return result;
};

const forgotPassword = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error(`User not found with email: ${email}`);
  } else {
    const passcode = utils.randomVerifiedCode();
    user.resetPasswordToken = passcode;
    user.otp = passcode
    user.resetPasswordExpires = Date.now() + 360000; // expires in 1 hour
    await user.save();
    
    const html = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333333;
            margin: 0;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          h2 {
            color: #2c3e50;
          }
          p {
            font-size: 16px;
            line-height: 1.6;
          }
          .otp {
            font-size: 24px;
            font-weight: bold;
            color: #e74c3c;
            margin: 20px 0;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #e74c3c;
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            margin-top: 20px;
            font-weight: bolder;
          }
          .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #999999;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Hi, ${user?.firstName}</h2>
          <p>Welcome onboard.<br /><br />
          This is a ship sailing towards financial independence city. To get all the benefits at hand, kindly enter the provided code below on the Centi platform to proceed to the next cabin.</p>
          <div class="otp">${passcode}</div>
          <a href="https://centi-platform.com/reset-password/${user?.email}/${passcode}" class="button">Reset Password</a>
          <p class="footer">If you didn't request this, you can ignore it.</p>
        </div>
      </body>
    </html>
    `
  
    // send mail
    await sendEmail(user?.email, "Centi: Password Reset Request", html);
    return {
      success: true,
      otp: passcode
    }
  }
};

const resetPassword = async (email, otp, newPassword, ipAddress) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials. Click the button on the email to get correct details')
  }
  // confirm otp
  if(user?.otp !== otp) {
    throw new Error('Invalid credentials. Click the button on the email to get correct details')
  }

  user.password = newPassword
  await user.save();

  const token = generateToken(user);
  const refreshToken = await generateRefreshToken(user, ipAddress);
  return { user, token, refreshToken: refreshToken.token };
};

const verifyCode = async data => {
  const { code, email } = data;
  const user = await User.findOne({
    resetPasswordToken: code,
    email: email,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    throw new Error("Code is invalid or has expired!");
  } else {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    const token = generateToken(user);
    return { token };
  }
};

// const loginWithGoogle = async (id_token, access_token, ipAddress) => {
//   try {
//     let dataRequest;
//     if (access_token) {
//       dataRequest = await axios.get(
//         `${config.profileUrl.google_access_token}?alt=json&access_token=${access_token}`
//       );
//     } else {
//       dataRequest = await axios.get(
//         `${config.profileUrl.google_id_token}?id_token=${id_token}`
//       );
//     }

//     let user = await User.findOne({ email: dataRequest.data.email });

//     if (!user) {
//       user = new User();
//       user.services.google.id = access_token
//         ? dataRequest.data.id
//         : dataRequest.data.sub;
//       user.fullName = dataRequest.data.name;
//       user.email = dataRequest.data.email;
//       user.avatar.src = dataRequest.data.picture;
//       await user.save();
//     }
//     const token = generateToken(user);
//     const refreshToken = await generateRefreshToken(user, ipAddress);
//     return { user, token, refreshToken: refreshToken.token };
//   } catch (err) {
//     throw new Error("Invalid profile google");
//   }
// };

// const loginWithFacebook = async (facebookToken, ipAddress) => {
//   try {
//     const { data } = await axios.get(
//       `${config.profileUrl.facebook}?fields=picture,email,name&access_token=${facebookToken}`
//     );

//     let user = await User.findOne({
//       $or: [
//         {
//           services: { facebook: { id: data.id } }
//         },
//         { email: data.email }
//       ]
//     });

//     if (!user) {
//       user = new User();
//       user.services.facebook.id = data.id;
//       user.fullName = data.name;
//       user.avatar.src = data.picture.data.url;
//       await user.save();
//     }
//     const token = generateToken(user);
//     const refreshToken = await generateRefreshToken(user, ipAddress);
//     return { user, token, refreshToken: refreshToken.token };
//   } catch (err) {
//     throw new Error("Invalid profile facebook");
//   }
// };

// const loginWithApple = async (appleToken, ipAddress) => {
//   let decodedToken = await decodeToken(appleToken);
//   let user = await User.findOne({ email: decodedToken.email });

//   if (!user) {
//     user = await User.create({
//       email: decodedToken.email,
//       full_name: decodedToken.email,
//       services: { apple: { id: decodedToken.sub } }
//     });
//   }
//   const token = generateToken(user);
//   const refreshToken = await generateRefreshToken(user, ipAddress);
//   return { user, token, refreshToken: refreshToken.token };
// };

const refreshToken = async (token, ipAddress) => {
  const refreshToken = await refreshTokenService.findOne({
    token: token
  });
  if (refreshToken) {
    const user = await userService.findById(refreshToken.user);
    const newToken = generateToken(user);
    const newRefreshToken = await generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    return { user, token: newToken, refreshToken: newRefreshToken.token };
  } else {
    throw new Error("The refresh token is invalid!");
  }
};

const generateToken = user => {
  return jwt.sign({
    uid: user._id,
    role: user.role
  });
};

const generateRefreshToken = async (user, ipAddress) => {
  const refreshToken = jwt.refreshSign(user._id);
  // save the token
  return await refreshTokenService.create({
    user: user._id,
    token: refreshToken,
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
};

export default {
  signup,
  requestOtpLogin,
  handleCompareOtp,
  login,
  logout,
  checkEmailIsValid,
  checkUsernameIsValid,
  forgotPassword,
  resetPassword,
  verifyCode,
  refreshToken,
  verifyOTPOnSignup
};
