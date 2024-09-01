"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("../../../helpers/common");
var _expenses = _interopRequireDefault(require("./expenses.model"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
class ExpensesService extends _common.Service {
  constructor() {
    super(_expenses.default);
  }
  async createBudgetItems(data) {
    if (Array.isArray(data)) {
      return await _expenses.default.insertMany(data);
    } else {
      return await _expenses.default.create(data);
    }
  }
  async updateBudget(id, data) {
    return await _expenses.default.findOneAndUpdate({
      _id: id
    }, data);
  }
  async getBudgetItemsForOneBudget(budgetId, userId) {
    return await _expenses.default.find({
      budgetId,
      userId
    });
    // const tt = await Expenses.aggregate([
    //   {
    //     $match: {
    //       budgetId: ObjectId(budgetId),
    //       userId: user?._id
    //     }
    //   },
    //   {
    //     $lookup: {
    //       from: "financialgoals", // name of the financialGoals collection
    //       foreignField: `${ObjectId("65f586286cde1ba2271e4553")}`, // field from the BudgetItems collection
    //       localField: "_id", // field from the financialGoals collection
    //       as: "financialGoalInfo" // alias for the joined datdf
    //     }
    //   },
    //   {
    //     $project: {
    //       financialGoalInfo: 0
    //     }
    //   },
    //   {
    //     $unwind: "$financialGoalInfo" // deconstructs the financialGoalInfo array
    //   },
    //   {
    //     $sort: { createdAt: -1 }
    //   }
    // ]);
    // console.log(budgetId, "......budgetid.....", tt);
    // return tt;

    // const response = await BudgetItems.aggregate([
    //   {
    //     $lookup: {
    //       from: "financialGoals",
    //       localField: "_id",
    //       foreignField: "financialGoal",
    //       as: "financialGoals"
    //     }
    //   },
    //   {
    //     $project: {
    //       financialGoals: []
    //     }
    //   },
    //   {
    //     $sort: { createdAt: -1 }
    //   }
    // ]);

    // return response;
  }
  async deleteBudgetItem(budgetItemId, userId) {
    const budgetItem = await _expenses.default.findById({
      _id: budgetItemId,
      userId
    });
    if (!budgetItem) {
      throw new Error("Budget item not found");
    }
    return await _expenses.default.findByIdAndDelete(budgetItemId);
  }
}
var _default = exports.default = new ExpensesService();