"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../helpers/common");
var _savings = _interopRequireDefault(require("./savings.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class SavingsService extends _common.Service {
  constructor() {
    super(_savings.default);
  }
  async create(data) {
    return await _savings.default.create(data);
  }
  async findAll({
    userId,
    sortBy
  }) {
    const response = await _savings.default.aggregate([{
      $match: {
        userId
      }
    }, {
      $sort: {
        createdAt: sortBy ?? -1
      }
    }]);
    const result = {
      total: response.length,
      data: response
    };
    return result;
  }
  async findOneById({
    id,
    userId
  }) {
    const response = await _savings.default.findOne({
      _id: id,
      userId
    });
    if (response) {
      return response;
    } else throw new Error("Savings goal not found!");
  }
}
var _default = exports.default = new SavingsService();