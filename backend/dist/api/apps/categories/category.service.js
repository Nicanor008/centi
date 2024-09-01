"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../helpers/common");
var _category = _interopRequireDefault(require("./category.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class CategoryService extends _common.Service {
  constructor() {
    super(_category.default);
  }
  async create(data) {
    return data.length > 0 ? await _category.default.insertMany(data) : await _category.default.create(data);
  }

  // view category as per user
  async viewAllCategoriesPerUser(userId) {
    return await _category.default.find({
      userId
    });
  }
}
var _default = exports.default = new CategoryService();