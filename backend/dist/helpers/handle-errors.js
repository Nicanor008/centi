"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notFoundHandle = exports.logErrors = exports.errorHandle = void 0;
var _celebrate = require("celebrate");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _services = require("../services");
var _response = _interopRequireDefault(require("./response"));
var _error = require("./error");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-unused-vars
const errorHandle = (error, req, res, next) => {
  if (typeof error === "string") {
    // custom application error
    return _response.default.error(res, {
      message: error
    });
  } else if ((0, _celebrate.isCelebrateError)(error)) {
    const bodyCelebrateError = error.details.get(_celebrate.Segments.BODY);
    const headerCelebrateError = error.details.get(_celebrate.Segments.HEADERS);
    const response = {
      message: "Invalid request data. Please review the request and try again.",
      code: []
    };
    if (bodyCelebrateError) {
      response.code = response.code.concat(bodyCelebrateError.details.map(({
        message,
        type
      }) => ({
        message: message.replace(/['"]/g, ""),
        code: type
      })));
    }
    if (headerCelebrateError) {
      response.code = response.code.concat(headerCelebrateError.details.map(({
        message,
        type
      }) => ({
        message: message.replace(/['"]/g, ""),
        code: type
      })));
    }
    return _response.default.error(res, response);
  } else if (error instanceof _error.AppError) {
    return _response.default.error(res, {
      message: error.message,
      code: error.code
    });
  } else if (error.name === "CastError" && error.kind === "ObjectId") {
    return _response.default.error(res, {
      // code: error.name,
      message: "malformatted id"
    });
  } else if (error.name === "ValidationError") {
    return _response.default.error(res, {
      message: error.message
    });
  } else if (error.name === "Error") {
    return _response.default.error(res, {
      message: error.message
    });
  } else if (error.name === "CustomError") {
    return _response.default.error(res, error);
  }
  // default to 500 server error
  _services.logger.error("%o", error);
  return _response.default.error(res, {
    message: error.message,
    stack: error.stack
  }, _httpStatus.default.INTERNAL_SERVER_ERROR);
};
exports.errorHandle = errorHandle;
const logErrors = (err, req, res, next) => {
  console.error(err.stack);
  next(err);
};
exports.logErrors = logErrors;
const notFoundHandle = (req, res, next) => {
  return _response.default.error(res, {
    code: "NotFound",
    message: "Page Not Found"
  }, 404);
};
exports.notFoundHandle = notFoundHandle;