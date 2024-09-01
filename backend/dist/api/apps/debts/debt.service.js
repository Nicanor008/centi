"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _debt = _interopRequireDefault(require("./debt.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class DebtService extends _common.Service {
  constructor() {
    super(_debt.default);
  }
}
var _default = exports.default = new DebtService();