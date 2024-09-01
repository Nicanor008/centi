"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _helpers = require("../../../helpers");
var _common = require("../../../helpers/common");
var _expenses = _interopRequireDefault(require("./expenses.service"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class ExpensesController extends _common.Controller {
  constructor(service) {
    super(service);
    // this.createBudget = this.createBudget.bind(this);
  }

  // Create a budget
  async createBudgetItems(req, res, next) {
    try {
      const data = _objectSpread(_objectSpread({}, req.body), {}, {
        userId: req.user._id
      });
      const result = await _expenses.default.createBudgetItems(data);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  // update budget item
  async updateBudget(req, res, next) {
    try {
      const data = _objectSpread(_objectSpread({}, req.body), {}, {
        userId: req.user?._id
      });
      const result = await _expenses.default.updateBudget(req.params.id, data);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }

  // Get all budget items for one budget
  async getBudgetItemsForOneBudget(req, res, next) {
    try {
      const result = await _expenses.default.getBudgetItemsForOneBudget(req.params.budgetId, req.user._id);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }

  // delete budget item
  async deleteBudgetItem(req, res, next) {
    try {
      const result = await _expenses.default.deleteBudgetItem(req.params.id, req.user?._id);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }
}
var _default = exports.default = new ExpensesController(_expenses.default, "BudgetItems");