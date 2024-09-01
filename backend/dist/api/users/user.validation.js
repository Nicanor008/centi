"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMeSchema = exports.paginateUserValidateSchema = exports.changePasswordSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  paginateValidationSchema
} = _helpers.schemas;
const paginateUserValidateSchema = exports.paginateUserValidateSchema = paginateValidationSchema.keys({
  email: _joi.default.string().optional()
}); // add more key

const changePasswordSchema = exports.changePasswordSchema = _joi.default.object({
  currentPassword: _joi.default.string().min(4).max(255).default(" ").optional(),
  newPassword: _joi.default.string().required().invalid(_joi.default.ref("password")),
  confirmNewPassword: _joi.default.string().required().valid(_joi.default.ref("newPassword"))
});
const updateMeSchema = exports.updateMeSchema = _joi.default.object({
  email: _joi.default.any().forbidden(),
  isPremium: _joi.default.any().forbidden(),
  role: _joi.default.any().forbidden()
}).unknown(true);