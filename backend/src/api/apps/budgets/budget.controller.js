import { Controller } from "../../helpers/common";
import budgetService from "./budget.service";
import { handleResponse as Response } from "../../helpers";

class BudgetController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
}

export default new BudgetController(budgetService, "Budget");
