"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginateValidationSchema = exports.objectIdSchema = exports.ObjectId = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// accepts a valid UUID v4 string as id
const ObjectId = exports.ObjectId = _joi.default.string().regex(/^[0-9a-fA-F]{24}$/);
const objectIdSchema = exports.objectIdSchema = _joi.default.object({
  id: ObjectId.required()
});
const paginateValidationSchema = exports.paginateValidationSchema = _joi.default.object({
  sort: _joi.default.string().default("-createdAt").optional(),
  page: _joi.default.number().greater(0).default(1).positive().optional(),
  limit: _joi.default.number().greater(0).default(25).positive().optional(),
  filter: _joi.default.string().optional()
});