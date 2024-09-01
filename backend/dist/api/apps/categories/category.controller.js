"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _common = require("../../../helpers/common");
var _category = _interopRequireDefault(require("./category.service"));
var _helpers = require("../../../helpers");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class CategoryController extends _common.Controller {
  constructor(service, name) {
    super(service, name);
  }
  async create(req, res, next) {
    try {
      let data = req.body;
      if (Array.isArray(req.body)) {
        data = data.map(item => _objectSpread(_objectSpread({}, item), {}, {
          userId: req.user?._id
        }));
      } else {
        data = _objectSpread(_objectSpread({}, req.body), {}, {
          userId: req.user?._id
        });
      }
      const result = await _category.default.create(data);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.CREATED);
    } catch (exception) {
      next(exception);
    }
  }
  async viewAllCategoriesPerUser(req, res, next) {
    try {
      const result = await _category.default.viewAllCategoriesPerUser(req.user?._id);
      return _helpers.handleResponse.success(res, result, _httpStatus.default.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }
}
var _default = exports.default = new CategoryController(_category.default, "Category");