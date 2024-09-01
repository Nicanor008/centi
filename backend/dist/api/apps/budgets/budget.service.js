"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _mongoose = require("mongoose");
var _common = require("../../../helpers/common");
var _budget = _interopRequireDefault(require("./budget.model"));
var _expenses = _interopRequireDefault(require("../expenses/expenses.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class BudgetService extends _common.Service {
  constructor(model) {
    super(model);
    this.viewAllBudgets = this.viewAllBudgets.bind();
  }
  async createBudget(data) {
    return await _budget.default.create(data);
  }
  async updateBudget(id, data) {
    return await _budget.default.findOneAndUpdate({
      _id: id
    }, data);
  }
  async viewAllBudgets({
    user,
    sortBy
  }) {
    const response = await _budget.default.aggregate([{
      $match: {
        userId: user?._id
      }
    }, {
      $lookup: {
        from: "expenses",
        localField: "_id",
        foreignField: "budgetId",
        as: "budgetItems"
      }
    },
    // {
    //   $lookup: {
    //     from: "financialGoal",
    //     localField: "_id",
    //     foreignField: "financialGoal",
    //     as: "financialGoal"
    //   }
    // },
    // {
    //   $lookup: {
    //     from: "users",
    //     localField: "_id",
    //     foreignField: "userId",
    //     as: "users"
    //   }
    // },
    {
      $addFields: {
        budgetItemsCount: {
          $size: "$budgetItems"
        }
      }
    },
    // {
    //   $project: {
    //     budgetItems: "$budgetItems",
    //     financialGoals: "$financialGoals"
    //   }
    // },
    {
      $sort: {
        createdAt: sortBy ?? -1
      }
    }]);
    const userAllExpenses = await _expenses.default.find({
      userId: user?._id
    });
    const totalUserAllExpenses = userAllExpenses.reduce((acc, curr) => Number(acc) + Number(curr.actualExpenses), 0);
    const result = {
      total: response.length,
      totalExpenses: totalUserAllExpenses,
      data: response
    };
    return result;
  }
  async findOneBudgetById(budgetId) {
    const response = await _budget.default.findById({
      _id: budgetId
    });
    if (response) {
      return response;
    } else throw new Error("Budget not found!");
  }
  async budgetAnalytics(user) {
    const budget = await this.viewAllBudgets({
      user,
      sortBy: 1
    });
    const totalBudgetExpensesAmount = budget?.data?.reduce((acc, item) => acc + item.plannedExpenses, 0);
    const totalNumberofBudgetItems = budget?.data?.reduce((acc, item) => acc + item.budgetItemsCount, 0);

    // calculate budget expenses
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
    const currentYear = currentDate.getFullYear();

    // Filter budget items created in the current month
    const budgetItemsThisMonth = budget?.data?.filter(budgetItem => {
      const createdAt = new Date(budgetItem.createdAt);
      const itemMonth = createdAt.getMonth() + 1;
      const itemYear = createdAt.getFullYear();
      return itemMonth === currentMonth && itemYear === currentYear;
    });

    // Calculate total planned expenses for the current month
    const totalPlannedExpensesThisMonth = budgetItemsThisMonth.reduce((total, budgetItem) => {
      return total + budgetItem.plannedExpenses;
    }, 0);

    // category counts
    const categoryCount = {};

    // Iterate over each budget item
    budget?.data?.forEach(budgetItem => {
      // Extract categories from the budget item
      const categories = budgetItem?.category || [];

      // Iterate over each category in the budget item
      categories.forEach(category => {
        const {
          label
        } = category;

        // Increment the count for the category
        if (categoryCount[label]) {
          categoryCount[label]++;
        } else {
          categoryCount[label] = 1;
        }
      });
    });
    const result = {
      totalNumberofBudget: budget.data.length,
      totalNumberofBudgetItems,
      totalBudgetExpensesAmount,
      totalPlannedExpensesThisMonth,
      totalNumberofBudgetThisMonth: budgetItemsThisMonth.length,
      categoryCount,
      budget: budget.data
    };
    return result;
  }
}
var _default = exports.default = new BudgetService(_budget.default);