"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verify = exports.sign = exports.refreshVerify = exports.refreshSign = exports.getToken = exports.default = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const sign = data => {
  const token = _jsonwebtoken.default.sign(data, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES
  });
  return token;
};
exports.sign = sign;
const verify = token => {
  return _jsonwebtoken.default.verify(token, process.env.JWT_SECRET, {
    ignoreExpiration: false
  });
};
exports.verify = verify;
const refreshSign = uid => {
  const token = _jsonwebtoken.default.sign({
    uid: uid
  }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES
  });
  return token;
};
exports.refreshSign = refreshSign;
const refreshVerify = token => {
  return _jsonwebtoken.default.verify(token, process.env.JWT_REFRESH_SECRET, {
    ignoreExpiration: false
  });
};
exports.refreshVerify = refreshVerify;
const getToken = req => {
  let authorization = null;
  let token = null;
  if (req.query && req.query.token) {
    return req.query.token;
  } else if (req.authorization) {
    authorization = req.authorization;
  } else if (req.headers) {
    authorization = req.headers.authorization;
  } else if (req.socket) {
    if (req.socket.handshake.query && req.socket.handshake.query.token) {
      return req.socket.handshake.query.token;
    }
    authorization = req.socket.handshake.headers.authorization;
  }
  if (authorization) {
    const tokens = authorization.split("Bearer ");
    if (Array.isArray(tokens) || tokens.length === 2) {
      token = tokens[1];
    }
  }
  return token;
};
exports.getToken = getToken;
var _default = exports.default = {
  sign,
  verify,
  getToken,
  refreshSign,
  refreshVerify
};