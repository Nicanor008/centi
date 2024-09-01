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
  description: _joi.default.string().optional().allow(""),
  plannedExpenses: _joi.default.string(),
  actualExpenses: _joi.default.string().optional().allow(""),
  plannedIncome: _joi.default.string().optional().allow(""),
  actualIncome: _joi.default.string().optional().allow(""),
  isRecurring: _joi.default.bool().optional(),
  isActive: _joi.default.bool().optional(),
  category: _joi.default.array().optional(),
  financialGoal: _joi.default.string().optional().allow("")
});
const updateValidationSchema = exports.updateValidationSchema = _joi.default.object({
  actualExpenses: _joi.default.number().required(),
  name: _joi.default.string().optional()
}).unknown(true);