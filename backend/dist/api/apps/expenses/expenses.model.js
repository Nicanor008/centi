"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ExpensesSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  plannedExpenses: {
    type: String,
    required: false
  },
  actualExpenses: {
    type: String,
    required: false
  },
  isRecurring: {
    type: Boolean,
    required: false,
    default: false
  },
  budgetId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Budget",
    required: true
  },
  category: {
    type: Array,
    required: false
  },
  financialGoal: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "FinancialGoal",
    required: false
  },
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  // currencyId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Currency",
  //   required: true,
  //   default: "USD" // TODO: update to USD id value
  // },
  // userId: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true
  // },
  // financialGoal: {
  //   type: Schema.Types.ObjectId,
  //   ref: "FinancialGoal",
  //   required: false
  // },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  }
}, {
  timestamps: true
});
ExpensesSchema.plugin(_mongoosePaginateV.default);
ExpensesSchema.plugin(_mongooseUniqueValidator.default);
const Expenses = _mongoose.default.model("Expenses", ExpensesSchema);
var _default = exports.default = Expenses;