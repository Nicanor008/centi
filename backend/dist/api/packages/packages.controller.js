"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _packages = _interopRequireDefault(require("./packages.service"));
var _helpers = require("../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PackagesController extends _common.Controller {
  constructor(service, name) {
    super(service, name);
  }
}
var _default = exports.default = new PackagesController(_packages.default, "Packages");