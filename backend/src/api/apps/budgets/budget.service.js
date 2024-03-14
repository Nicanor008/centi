import { Service } from "../../../helpers/common";
import Budget from "./budget.model";

class BudgetService extends Service {
  constructor(model) {
    super(model);
    this.viewAllBudgets = this.viewAllBudgets.bind();
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

  async budgetAnalytics() {
    const budget = await this.viewAllBudgets();
    console.log(budget.data.length, "...........>>>....");

    const totalBudgetExpensesAmount = budget?.data?.reduce(
      (acc, item) => acc + item.plannedExpenses,
      0
    );

    const totalNumberofBudgetItems = budget?.data?.reduce(
      (acc, item) => acc + item.budgetItemsCount,
      0
    );

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
    const totalPlannedExpensesThisMonth = budgetItemsThisMonth.reduce(
      (total, budgetItem) => {
        return total + budgetItem.plannedExpenses;
      },
      0
    );
    console.log(budget.data.length, ".......<<<<<<<....");

    const result = {
      totalNumberofBudget: budget.data.length,
      totalNumberofBudgetItems,
      totalBudgetExpensesAmount,
      totalPlannedExpensesThisMonth,
      totalNumberofBudgetThisMonth: budgetItemsThisMonth.length
    };
    return result;
  }
}

export default new BudgetService(Budget);
