"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyOTPOnSignup = exports.verifyCode = exports.signup = exports.resetPassword = exports.requestOtpLogin = exports.refreshToken = exports.logout = exports.login = exports.handleCompareOtp = exports.forgotPassword = exports.checkUsername = exports.checkEmail = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _response = _interopRequireDefault(require("../../helpers/response"));
var _auth = _interopRequireDefault(require("./auth.service"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const signup = async (req, res, next) => {
  try {
    const data = req.body;
    const ipAddress = req.ip;
    const result = await _auth.default.signup(data, ipAddress);
    return _response.default.success(res, result, _httpStatus.default.CREATED);
  } catch (exception) {
    next(exception);
  }
};
exports.signup = signup;
const verifyOTPOnSignup = async (req, res, next) => {
  try {
    const result = await _auth.default.verifyOTPOnSignup(req.body.user, req.body.otp, req.ip);
    return _response.default.success(res, result, _httpStatus.default.SUCCESS);
  } catch (exception) {
    next(exception);
  }
};
exports.verifyOTPOnSignup = verifyOTPOnSignup;
const login = async (req, res) => {
  const user = req.user;
  const ipAddress = req.ip;
  const result = await _auth.default.login(user, ipAddress);
  setTokenCookie(res, result.refreshToken);
  // return the information including token as JSON
  return _response.default.success(res, result, _httpStatus.default.OK);
};
exports.login = login;
const requestOtpLogin = async (req, res) => {
  const {
    email
  } = req.body;
  await _auth.default.requestOtpLogin(email);
  // return the information including token as JSON
  return _response.default.success(res, {
    message: "Opt has been sent"
  });
};
exports.requestOtpLogin = requestOtpLogin;
const handleCompareOtp = async (req, res, next) => {
  try {
    const {
      email,
      otpRequest
    } = req.body;
    const result = await _auth.default.handleCompareOtp(email, otpRequest);
    return _response.default.success(res, result);
  } catch (exception) {
    next(exception);
  }
};
exports.handleCompareOtp = handleCompareOtp;
const logout = async (req, res, next) => {
  try {
    const {
      token
    } = req.body;
    const result = await _auth.default.logout(token);
    return _response.default.success(res, result, _httpStatus.default.OK);
  } catch (exception) {
    next(exception);
  }
};
exports.logout = logout;
const checkEmail = async (req, res, next) => {
  try {
    const {
      email
    } = req.body;
    const result = await _auth.default.checkEmailIsValid(email);
    return _response.default.success(res, result, _httpStatus.default.OK);
  } catch (exception) {
    next(exception);
  }
};
exports.checkEmail = checkEmail;
const checkUsername = async (req, res, next) => {
  try {
    const {
      username
    } = req.body;
    const result = await _auth.default.checkUsernameIsValid(username);
    return _response.default.success(res, result, _httpStatus.default.OK);
  } catch (exception) {
    next(exception);
  }
};
exports.checkUsername = checkUsername;
const forgotPassword = async (req, res, next) => {
  const {
    email
  } = req.body;
  try {
    const result = await _auth.default.forgotPassword(email);
    return _response.default.success(res, result);
  } catch (exception) {
    next(exception);
  }
};
exports.forgotPassword = forgotPassword;
const verifyCode = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await _auth.default.verifyCode(data);
    return _response.default.success(res, ...result);
  } catch (exception) {
    next(exception);
  }
};
exports.verifyCode = verifyCode;
const resetPassword = async (req, res, next) => {
  const {
    email,
    otp,
    newPassword
  } = req.body;
  const ipAddress = req.ip;
  try {
    const result = await _auth.default.resetPassword(email, otp, newPassword, ipAddress);
    return _response.default.success(res, result);
  } catch (exception) {
    next(exception);
  }
};

// export const loginWithGoogle = async (req, res, next) => {
//   try {
//     const { id_token, access_token } = req.body;
//     const ipAddress = req.ip;
//     const result = await authService.loginWithGoogle(
//       id_token,
//       access_token,
//       ipAddress
//     );
//     return Response.success(res, result);
//   } catch (exception) {
//     next(exception);
//   }
// };

// export const loginWithFacebook = async (req, res, next) => {
//   try {
//     const { access_token } = req.body;
//     const ipAddress = req.ip;
//     const result = await authService.loginWithFacebook(access_token, ipAddress);
//     return Response.success(res, result);
//   } catch (exception) {
//     next(exception);
//   }
// };

// export const loginWithApple = async (req, res, next) => {
//   try {
//     const { access_token } = req.body;
//     const ipAddress = req.ip;
//     let result = await authService.loginWithApple(access_token, ipAddress);

//     return Response.success(res, result);
//   } catch (e) {
//     next(e);
//   }
// };
exports.resetPassword = resetPassword;
const refreshToken = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    const ipAddress = req.ip;
    const result = await _auth.default.refreshToken(token, ipAddress);
    return _response.default.success(res, result);
  } catch (exception) {
    next(exception);
  }
};
exports.refreshToken = refreshToken;
const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  };
  res.cookie("refreshToken", token, cookieOptions);
};