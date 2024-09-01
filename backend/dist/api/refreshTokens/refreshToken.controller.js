"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _refreshToken = _interopRequireDefault(require("./refreshToken.service"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class RefreshTokenController extends _common.Controller {
  constructor(service, name) {
    super(service, name);
  }
}
var _default = exports.default = new RefreshTokenController(_refreshToken.default, "RefreshToken");