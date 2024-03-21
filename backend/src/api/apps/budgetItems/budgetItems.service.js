import { Service } from "../../../helpers/common";
import BudgetItems from "./budgetItems.model";
const { ObjectId } = require("mongodb");

class BudgetItemsService extends Service {
  constructor() {
    super(BudgetItems);
  }
  async createBudgetItems(data) {
    return await BudgetItems.create(data);
  }

  async getBudgetItemsForOneBudget(budgetId, userId) {
    return await BudgetItems.find({
      budgetId,
      userId
    });
    // const tt = await BudgetItems.aggregate([
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
    const budgetItem = await BudgetItems.findById({
      _id: budgetItemId,
      userId
    });

    if (!budgetItem) {
      throw new Error("Budget item not found");
    }

    return await BudgetItems.findByIdAndDelete(budgetItemId);
  }
}

export default new BudgetItemsService();
