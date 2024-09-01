"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
var _logger = _interopRequireDefault(require("./logger"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
_mongoose.default.Promise = global.Promise;
_mongoose.default.connection.on("error", err => {
  _logger.default.error("MongoDB connection error: " + err);
  process.exit(-1);
});
_mongoose.default.connection.once("open", function () {
  // we're connected!
  _logger.default.info("Successfully connected to the database");
});
var _default = exports.default = _mongoose.default;