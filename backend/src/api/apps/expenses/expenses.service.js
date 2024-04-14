import { Service } from "../../../helpers/common";
import Expenses from "./expenses.model";

class ExpensesService extends Service {
  constructor() {
    super(Expenses);
  }
  async createBudgetItems(data) {
    return await Expenses.create(data);
  }

  async updateBudget(id, data) {
    return await Expenses.findOneAndUpdate({ _id: id }, data);
  }

  async getBudgetItemsForOneBudget(budgetId, userId) {
    return await Expenses.find({
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
    const budgetItem = await Expenses.findById({
      _id: budgetItemId,
      userId
    });

    if (!budgetItem) {
      throw new Error("Budget item not found");
    }

    return await Expenses.findByIdAndDelete(budgetItemId);
  }
}

export default new ExpensesService();
