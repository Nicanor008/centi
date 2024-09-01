"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _helpers = require("../../../helpers");
var _common = require("../../../helpers/common");
var _expenses = _interopRequireDefault(require("../expenses/expenses.model"));
var _budget = _interopRequireDefault(require("./budget.model"));
var _budget2 = _interopRequireDefault(require("./budget.service"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class BudgetController extends _common.Controller {
  constructor(service) {
    super(service);
    this.createBudget = this.createBudget.bind(this);
  }

  // Create a budget
  async createBudget(req, res, next) {
    try {
      const data = _objectSpread(_objectSpread({}, req.body), {}, {
        userId: req.user?._id
      });
      const result = await _budget2.default.createBudget(data);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.CREATED);
    } catch (exception) {
      next(exception);
    }
  }
  async updateBudget(req, res, next) {
    try {
      const data = _objectSpread(_objectSpread({}, req.body), {}, {
        userId: req.user?._id
      });
      const result = await _budget2.default.updateBudget(req.params.id, data);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.ACCEPTED);
    } catch (exception) {
      next(exception);
    }
  }

  // View all budgets
  async viewAllBudgets(req, res, next) {
    try {
      let result = await _budget2.default.viewAllBudgets({
        user: req?.user
      });
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
  async findOneBudgetById(req, res, next) {
    try {
      const result = await _budget2.default.findOneBudgetById(req.params.budgetId);
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
  async budgetAnalytics(req, res, next) {
    try {
      const result = await _budget2.default.budgetAnalytics(req.user);
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
  async deleteBudget(req, res, next) {
    try {
      const result = await _budget.default.findByIdAndRemove(req.params.id);

      // if result is successfully, delete all budget items
      await _expenses.default.deleteMany({
        budgetId: req.params.id
      });
      return _helpers.handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

// // Get a budget by userId
// router.get("/:userId", async (req, res) => {
//   try {
//     const response = await Budget.find({ userId: req.params.userId });
//     return handleResponse.success(res, response);
//   } catch (error) {
//     return Response.error(res, { message: error });
//   }
// });

// // Get a budget by budget id
// router.get("/:budgetId", async (req, res) => {
//   try {
//     const response = await Budget.findById(req.params.budgetId);
//     if (!response) {
//       return Response.error(res, { message: "Budget not found" });
//     }
//     return handleResponse.success(res, response);
//   } catch (error) {
//     return Response.error(res, { message: error });
//   }
// });

// export default router;
var _default = exports.default = new BudgetController(_budget2.default, "Budget");