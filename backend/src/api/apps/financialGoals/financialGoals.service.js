import { Service } from "../../../helpers/common";
import budgetService from "../budgets/budget.service";
import FinancialGoals from "./financialGoals.model";

class FinancialGoalsService extends Service {
  constructor() {
    super(FinancialGoals);
    this.budgetService = budgetService;
  }

  async create(data) {
    return await FinancialGoals.create(data);
  }

  async viewAllGoals({ userId, sortBy }) {
    const response = await FinancialGoals.aggregate([
      {
        $match: { userId }
      },
      {
        $sort: { createdAt: sortBy ?? -1 }
      }
    ]);

    const result = {
      total: response.length,
      data: response
    };
    return result;
  }

  async findOneById({ id, userId }) {
    const response = await FinancialGoals.findOne({ _id: id, userId });
    if (response) {
      return response;
    } else throw new Error("Financial Goal not found!");
  }

  async groupedFinancialGoals({ user }) {
    const budget = await this.budgetService.viewAllBudgets({ user });
    const groupedBudget = budget.data.reduce((acc, curr) => {
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
      savings: {}
    };

    return result;
  }
}

export default new FinancialGoalsService();
