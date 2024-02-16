import { Service } from "../../helpers/common";
import BudgetItems from "./budgetItems.model";


class BudgetItemsService extends Service {
  constructor() {
    super(BudgetItems);
  }
}

export default new BudgetItemsService();
