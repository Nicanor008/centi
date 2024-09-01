"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _config = _interopRequireDefault(require("./config.service"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ConfigController extends _common.Controller {
  constructor(service, name) {
    super(service, name);
    this.listConfigsForApp = this.listConfigsForApp.bind(this);
  }
  async listConfigsForApp(req, res) {
    let data = await this.service.listForApp();
    return _helpers.handleResponse.success(res, data);
  }
}
var _default = exports.default = new ConfigController(_config.default, "Configs");