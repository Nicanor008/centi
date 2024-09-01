"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../helpers/common");
var _dashboard = _interopRequireDefault(require("./dashboard.service"));
var _helpers = require("../../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DashboardController extends _common.Controller {
  constructor(service, name) {
    super(service, name);
  }
  async analytics(req, res, next) {
    try {
      const result = await _dashboard.default.analytics(req.user);
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}
var _default = exports.default = new DashboardController(_dashboard.default, "Dashboard");