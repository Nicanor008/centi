"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _refreshToken = _interopRequireDefault(require("./refreshToken.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RefreshTokenService extends _common.Service {
  constructor() {
    super(_refreshToken.default);
  }
}
var _default = exports.default = new RefreshTokenService();