import User from "../users/users.model";
import { jwt, mailService } from "../../services";
import { utils } from "../../helpers";
import { generateOtp, compareOtp } from "../../helpers/utils";
// import deviceTokenService from '../deviceTokens/deviceToken.service';
import userService from "../users/users.service";
import refreshTokenService from "../refreshTokens/refreshToken.service";

const signup = async (data, ipAddress) => {
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new Error("Email existing in system!");
  }
  const user = await User.create(data);
  const token = generateToken(user);
  const refreshToken = await generateRefreshToken(user, ipAddress);
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
    user.resetPasswordExpires = Date.now() + 360000; // expires in 1 hour
    await user.save();
    mailService.sendPasswordResetEmail(email, passcode);
  }
};

const resetPassword = async (user, password) => {
  user.password = password;
  const result = await user.save();
  return result;
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
  refreshToken
};