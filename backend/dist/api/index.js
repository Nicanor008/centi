"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = require("express");
var _auth = _interopRequireDefault(require("./auth"));
var _users = _interopRequireDefault(require("./users"));
var _configs = _interopRequireDefault(require("./configs"));
var _budgets = _interopRequireDefault(require("./apps/budgets"));
var _categories = _interopRequireDefault(require("./apps/categories"));
var _financialGoals = _interopRequireDefault(require("./apps/financialGoals"));
var _savings = _interopRequireDefault(require("./apps/savings"));
var _dashboards = _interopRequireDefault(require("./apps/dashboards"));
var _expenses = _interopRequireDefault(require("./apps/expenses"));
var _aiGenerateBudget = _interopRequireDefault(require("./apps/aiGenerateBudget"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const router = new _express.Router();
router.use("/auth", _auth.default);
router.use("/users", _users.default);
router.use("/configs", _configs.default);
router.use("/budget", _budgets.default);
router.use("/expenses", _expenses.default);
router.use("/category", _categories.default);
router.use("/financial-goals", _financialGoals.default);
router.use("/savings", _savings.default);
router.use("/dashboard", _dashboards.default);
router.use("/generate-budget", _aiGenerateBudget.default);
var _default = exports.default = router;