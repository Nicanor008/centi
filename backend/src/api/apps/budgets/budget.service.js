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
    const response = await Budget.find().sort({ createdAt: -1 });
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
