"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PACKAGE_TYPE = void 0;
var _mongoose = _interopRequireWildcard(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _mongooseUniqueValidator = _interopRequireDefault(require("mongoose-unique-validator"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const PACKAGE_TYPE = exports.PACKAGE_TYPE = {
  LIFETIME: "LIFETIME",
  SUBSCRIPTION: "SUBSCRIPTION",
  PREPAID: "PREPAID"
};
const UNIT_TYPE = {
  MONTH: "month",
  YEAR: "year"
};
const PackagesSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: false
  },
  product_id: {
    type: String,
    unique: true,
    required: true
  },
  credit: {
    type: Number,
    default: 0
  },
  package_type: {
    type: String,
    enum: Object.values(PACKAGE_TYPE),
    default: PACKAGE_TYPE.SUBSCRIPTION
  },
  duration: {
    type: Number
  },
  unit: {
    type: String,
    enum: Object.values(UNIT_TYPE)
  }
}, {
  timestamps: true
});
PackagesSchema.plugin(_mongoosePaginateV.default);
PackagesSchema.plugin(_mongooseUniqueValidator.default);
const Packages = _mongoose.default.model("Packages", PackagesSchema);
var _default = exports.default = Packages;