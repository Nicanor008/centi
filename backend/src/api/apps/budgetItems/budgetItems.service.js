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

  async deleteBudgetItem(budgetItemId) {
    const budgetItem = await BudgetItems.findById({ _id: budgetItemId });

    if (!budgetItem) {
      throw new Error("Budget item not found");
    }

    return await BudgetItems.findByIdAndDelete(budgetItemId);
  }
}

export default new BudgetItemsService();
