"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// https://github.com/cryptlex/rest-api-response-format
class Response {
  static success(res, data, status = 200) {
    res.status(status);
    if (data && data.docs) {
      return res.json({
        status: "success",
        data: data.docs,
        total: data.totalDocs,
        limit: data.limit,
        page: data.page,
        pages: data.totalPages
      });
    }
    return res.json({
      status: "success",
      data: data
    });
  }
  static error(res, error, status = 400) {
    res.status(status);
    return res.json({
      status: "failed",
      error: {
        message: error.message,
        code: error.code,
        stack: process.env.NODE_ENV === "development" ? error.stack : {}
      }
    });
  }
}
exports.default = Response;