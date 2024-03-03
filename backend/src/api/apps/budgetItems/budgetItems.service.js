import { Service } from "../../../helpers/common";
import BudgetItems from "./budgetItems.model";

class BudgetItemsService extends Service {
  constructor() {
    super(BudgetItems);
  }
  async createBudgetItems(data) {
    return await BudgetItems.create(data);
  }

  async getBudgetItemsForOneBudget(budgetId) {
    return await BudgetItems.find({
      budgetId
    });
  }
}

export default new BudgetItemsService();
