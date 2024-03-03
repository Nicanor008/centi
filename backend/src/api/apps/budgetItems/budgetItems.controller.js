// import { Controller } from "../../helpers/common";
import budgetItemsService from "./budgetItems.service";
// import { handleResponse as Response } from "../../../helpers";
import BudgetItemsService from "./budgetItems.service";

import { handleResponse as Response } from "../../../helpers";
import { Controller } from "../../../helpers/common";
import httpStatus from "http-status";

class BudgetItemsController extends Controller {
  constructor(service) {
    super(service);
    // this.createBudget = this.createBudget.bind(this);
  }

  // Create a budget
  async createBudgetItems(req, res, next) {
    try {
      const data = req.body;
      const result = await BudgetItemsService.createBudgetItems(data);
      return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  // Get all budget items for one budget
  async getBudgetItemsForOneBudget(req, res, next) {
    console.log("--------------GETS HERE...........");
    try {
      const result = await BudgetItemsService.getBudgetItemsForOneBudget(
        req.params.budgetId
      );
      return Response.success(res, result, httpStatus.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }
}

export default new BudgetItemsController(budgetItemsService, "BudgetItems");
