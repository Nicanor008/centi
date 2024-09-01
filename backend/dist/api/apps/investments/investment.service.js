"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../helpers/common");
var _investment = _interopRequireDefault(require("./investment.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class InvestmentService extends _common.Service {
  constructor() {
    super(_investment.default);
  }
}
var _default = exports.default = new InvestmentService();