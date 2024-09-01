"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateValidationSchema = exports.customPaginateValidateSchema = exports.createValidationSchema = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _helpers = require("../../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const {
  paginateValidationSchema
} = _helpers.schemas;
const customPaginateValidateSchema = exports.customPaginateValidateSchema = paginateValidationSchema.keys();
const createValidationSchema = exports.createValidationSchema = _joi.default.object({
  name: _joi.default.string().required(),
  targetAmount: _joi.default.number().optional(),
  category: _joi.default.array().optional(),
  description: _joi.default.string().optional().allow(""),
  from: _joi.default.string().optional(),
  to: _joi.default.string().optional()
});
const updateValidationSchema = exports.updateValidationSchema = _joi.default.object({
  field: _joi.default.string().optional(),
  field2: _joi.default.string().optional()
}).unknown(true);