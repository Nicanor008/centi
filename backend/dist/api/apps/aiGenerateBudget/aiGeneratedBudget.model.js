"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// import mongoosePaginate from "mongoose-paginate-v2";
// import mongooseUniqueValidator from "mongoose-unique-validator";

const AIGeneratedBudgetSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userBudget: {
    type: String,
    required: true
  },
  userDescription: {
    type: String,
    required: true
  },
  generatedBudget: {
    type: Object,
    required: true
  }
}, {
  timestamps: true
});

// AIGeneratedBudgetSchema.plugin(mongoosePaginate);
// AIGeneratedBudgetSchema.plugin(mongooseUniqueValidator);

const AIGeneratedBudget = _mongoose.default.model("AIGeneratedBudget", AIGeneratedBudgetSchema);
var _default = exports.default = AIGeneratedBudget;