import { Controller } from "../../helpers/common";
import budgetItemsService from "./budgetItems.service";
import { handleResponse as Response } from "../../helpers";

class BudgetItemsController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
}

export default new BudgetItemsController(budgetItemsService, "BudgetItems");
