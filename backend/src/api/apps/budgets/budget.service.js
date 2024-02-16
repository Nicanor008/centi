import { Service } from "../../../helpers/common";
import Budget from "./budget.model";

class BudgetService extends Service {
  constructor(model) {
    super(model);
  }
  async createBudget(data) {
    return await Budget.create(data);
  }
}

export default new BudgetService(Budget);
