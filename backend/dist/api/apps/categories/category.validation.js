"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidationSchema = exports.customPaginateValidateSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _helpers = require("../../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  paginateValidationSchema,
  ObjectId
} = _helpers.schemas;
const customPaginateValidateSchema = exports.customPaginateValidateSchema = paginateValidationSchema.keys();

// export const createValidationSchema = Joi.any({
//   name: Joi.any().required()
// }).unknown(true);

const updateValidationSchema = exports.updateValidationSchema = _joi.default.object({
  name: _joi.default.string().optional()
}).unknown(true);