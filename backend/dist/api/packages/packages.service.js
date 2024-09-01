"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _packages = _interopRequireDefault(require("./packages.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class PackagesService extends _common.Service {
  constructor() {
    super(_packages.default);
  }
}
var _default = exports.default = new PackagesService();