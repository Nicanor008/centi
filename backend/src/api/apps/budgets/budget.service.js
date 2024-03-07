import { Service } from "../../../helpers/common";
import Budget from "./budget.model";

class BudgetService extends Service {
  constructor(model) {
    super(model);
  }
  async createBudget(data) {
    return await Budget.create(data);
  }

  async viewAllBudgets() {
    const response = await Budget.aggregate([
      {
        $lookup: {
          from: "budgetitems",
          localField: "_id",
          foreignField: "budgetId",
          as: "budgetItems"
        }
      },
      {
        $addFields: {
          budgetItemsCount: { $size: "$budgetItems" }
        }
      },
      {
        $project: {
          budgetItems: 0
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    const result = {
      total: response.length,
      data: response
    };
    return result;
  }

  async findOneBudgetById(budgetId) {
    const response = await Budget.findById({ _id: budgetId });
    if (response) {
      return response;
    } else throw new Error("Budget not found!");
  }
}

export default new BudgetService(Budget);
