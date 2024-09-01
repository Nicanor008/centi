"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCodeValidationSchema = exports.signupValidationSchema = exports.resetPasswordSchema = exports.requestOtpLoginValidationSchema = exports.refreshTokenSchema = exports.logoutValidationSchema = exports.loginValidationSchema = exports.getProfileSchema = exports.forgotPasswordSchema = exports.compareOtpValidationSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// password and confirmPassword must contain the same value
const signupValidationSchema = exports.signupValidationSchema = _joi.default.object({
  firstName: _joi.default.string().required(),
  lastName: _joi.default.string().optional(),
  email: _joi.default.string().email().lowercase().required(),
  password: _joi.default.string().min(4).required().strict()
});
const loginValidationSchema = exports.loginValidationSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  password: _joi.default.string().min(4).max(255).required()
});
const compareOtpValidationSchema = exports.compareOtpValidationSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  otpRequest: _joi.default.string().length(6).regex(/\d/).required()
});
const requestOtpLoginValidationSchema = exports.requestOtpLoginValidationSchema = _joi.default.object({
  email: _joi.default.string().email().required()
});
const logoutValidationSchema = exports.logoutValidationSchema = _joi.default.object({
  token: _joi.default.string().optional()
});
const forgotPasswordSchema = exports.forgotPasswordSchema = _joi.default.object({
  email: _joi.default.string().email().required()
});
const verifyCodeValidationSchema = exports.verifyCodeValidationSchema = _joi.default.object({
  email: _joi.default.string().email().required(),
  code: _joi.default.string().length(6).regex(/\d/).required()
});
const resetPasswordSchema = exports.resetPasswordSchema = _joi.default.object({
  newPassword: _joi.default.string().min(4).max(255).required(),
  confirmNewPassword: _joi.default.string().required().valid(_joi.default.ref("newPassword"))
});
const refreshTokenSchema = exports.refreshTokenSchema = _joi.default.object({
  refreshToken: _joi.default.string().optional()
});
const getProfileSchema = exports.getProfileSchema = _joi.default.object({
  access_token: _joi.default.string().optional(),
  id_token: _joi.default.when("access_token", {
    is: null,
    then: _joi.default.string().required(),
    otherwise: _joi.default.string()
  })
}).or("access_token", "id_token");