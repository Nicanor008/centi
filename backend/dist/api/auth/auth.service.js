"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _users = _interopRequireDefault(require("../users/users.model"));
var _services = require("../../services");
var _helpers = require("../../helpers");
var _utils = require("../../helpers/utils");
var _users2 = _interopRequireDefault(require("../users/users.service"));
var _refreshToken = _interopRequireDefault(require("../refreshTokens/refreshToken.service"));
var _sendMail = _interopRequireDefault(require("../../helpers/email/sendMail"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const signup = async (data, ipAddress) => {
  const existingUser = await _users.default.findOne({
    email: data.email
  });
  if (existingUser) {
    throw new Error("Email existing in system!");
  }
  const OTP = await (0, _utils.generateOtp)();
  const payload = _objectSpread(_objectSpread({}, data), {}, {
    otp: OTP,
    otpLastUpdate: Date.now()
  });
  const user = await _users.default.create(payload);
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
  `;

  // send mail
  await (0, _sendMail.default)(user.email, "Centi: Financial Account Created", html);
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
  return {
    user,
    token,
    refreshToken: refreshToken.token
  };
};
const requestOtpLogin = async email => {
  const existingUser = await _users.default.findOne({
    email
  });
  if (!existingUser) {
    await _users.default.create({
      email
    });
  }
  const OTP = await (0, _utils.generateOtp)(email);
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
  return (0, _sendMail.default)(optionsEmail);
};
const verifyOTPOnSignup = async (user, otp, ipAddress) => {
  const currentUser = await _users.default.findOne({
    email: user?.email
  });
  if (user?.otp !== currentUser?.otp) {
    throw new Error("Invalid or Wrong OTP");
  }
  return login(user, ipAddress);
};
const handleCompareOtp = async (email, otpRequest) => {
  const isValidOtp = await (0, _utils.compareOtp)(email, otpRequest);
  if (!isValidOtp) {
    throw new Error("Otp is invalid!");
  }
  const user = await _users.default.findOne({
    email
  });
  const access_token = generateToken(user);
  return {
    access_token
  };
};
const logout = async token => {
  // const result = await deviceTokenService.deleteDeviceTokenByToken(token);
  return {
    message: "Logout was successfully"
  };
};
const checkEmailIsValid = async email => {
  const count = await _users.default.countDocuments({
    email
  });
  let result = {
    isValid: true,
    message: "Your email is valid!"
  };
  if (count > 0) {
    result = {
      isValid: false,
      message: "Your email already exists!"
    };
  }
  return result;
};
const checkUsernameIsValid = async username => {
  const count = await _users.default.countDocuments({
    username
  });
  let result = {
    isValid: true,
    message: "Your username is valid!"
  };
  if (count > 0) {
    result = {
      isValid: false,
      message: "Your username already exists!"
    };
  }
  return result;
};
const forgotPassword = async email => {
  const user = await _users.default.findOne({
    email
  });
  if (!user) {
    throw new Error(`User not found with email: ${email}`);
  } else {
    const passcode = _helpers.utils.randomVerifiedCode();
    user.resetPasswordToken = passcode;
    user.otp = passcode;
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
    `;

    // send mail
    await (0, _sendMail.default)(user?.email, "Centi: Password Reset Request", html);
    return {
      success: true,
      otp: passcode
    };
  }
};
const resetPassword = async (email, otp, newPassword, ipAddress) => {
  const user = await _users.default.findOne({
    email
  });
  if (!user) {
    throw new Error('Invalid credentials. Click the button on the email to get correct details');
  }
  // confirm otp
  if (user?.otp !== otp) {
    throw new Error('Invalid credentials. Click the button on the email to get correct details');
  }
  user.password = newPassword;
  await user.save();
  const token = generateToken(user);
  const refreshToken = await generateRefreshToken(user, ipAddress);
  return {
    user,
    token,
    refreshToken: refreshToken.token
  };
};
const verifyCode = async data => {
  const {
    code,
    email
  } = data;
  const user = await _users.default.findOne({
    resetPasswordToken: code,
    email: email,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  });
  if (!user) {
    throw new Error("Code is invalid or has expired!");
  } else {
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();
    const token = generateToken(user);
    return {
      token
    };
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
  const refreshToken = await _refreshToken.default.findOne({
    token: token
  });
  if (refreshToken) {
    const user = await _users2.default.findById(refreshToken.user);
    const newToken = generateToken(user);
    const newRefreshToken = await generateRefreshToken(user, ipAddress);
    refreshToken.revoked = Date.now();
    refreshToken.revokedByIp = ipAddress;
    refreshToken.replacedByToken = newRefreshToken.token;
    await refreshToken.save();
    return {
      user,
      token: newToken,
      refreshToken: newRefreshToken.token
    };
  } else {
    throw new Error("The refresh token is invalid!");
  }
};
const generateToken = user => {
  return _services.jwt.sign({
    uid: user._id,
    role: user.role
  });
};
const generateRefreshToken = async (user, ipAddress) => {
  const refreshToken = _services.jwt.refreshSign(user._id);
  // save the token
  return await _refreshToken.default.create({
    user: user._id,
    token: refreshToken,
    // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
};
var _default = exports.default = {
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