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
  plannedExpenses: _joi.default.string().optional().allow(""),
  actualExpenses: _joi.default.string().optional().allow(""),
  budgetId: _joi.default.string(),
  isRecurring: _joi.default.bool(),
  isActive: _joi.default.bool(),
  category: _joi.default.array().optional(),
  financialGoal: _joi.default.string().optional()
});
const updateValidationSchema = exports.updateValidationSchema = _joi.default.object({
  actualExpenses: _joi.default.string().optional().allow("")
}).unknown(true);