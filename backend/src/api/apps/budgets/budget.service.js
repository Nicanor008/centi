import { Service } from "../../helpers/common";
import Budget from "./budget.model";


class BudgetService extends Service {
  constructor() {
    super(Budget);
  }
}

export default new BudgetService();
