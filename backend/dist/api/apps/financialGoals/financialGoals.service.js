"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../helpers/common");
var _budget = _interopRequireDefault(require("../budgets/budget.service"));
var _savings = _interopRequireDefault(require("../savings/savings.service"));
var _financialGoals = _interopRequireDefault(require("./financialGoals.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class FinancialGoalsService extends _common.Service {
  constructor() {
    super(_financialGoals.default);
    this.budgetService = _budget.default;
    this.savingsService = _savings.default;
  }
  async create(data) {
    return await _financialGoals.default.create(data);
  }
  async viewAllGoals({
    userId,
    sortBy
  }) {
    const response = await _financialGoals.default.aggregate([{
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
    const response = await _financialGoals.default.findOne({
      _id: id,
      userId
    });
    if (response) {
      return response;
    } else throw new Error("Financial Goal not found!");
  }
  async groupedFinancialGoals({
    user
  }) {
    // budget
    const budget = await this.budgetService.viewAllBudgets({
      user
    });
    const groupedBudget = budget.data.reduce((acc, curr) => {
      const financialGoal = curr.financialGoal;
      if (!acc[financialGoal]) {
        acc[financialGoal] = [];
      }
      acc[financialGoal].push(curr);
      return acc;
    }, {});

    // savings
    const savings = await this.savingsService.findAll({
      userId: user?._id
    });
    const groupedSavings = savings.data.reduce((acc, curr) => {
      const financialGoal = curr.financialGoal;
      if (!acc[financialGoal]) {
        acc[financialGoal] = [];
      }
      acc[financialGoal].push(curr);
      return acc;
    }, {});
    const result = {
      budget: {
        total: Object.values(groupedBudget).length,
        data: groupedBudget
      },
      savings: {
        total: Object.values(groupedSavings).length,
        data: groupedSavings
      }
    };
    return result;
  }
}
var _default = exports.default = new FinancialGoalsService();