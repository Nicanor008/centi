import httpStatus from "http-status";
import { handleResponse as Response } from "../../../helpers";
import { Controller } from "../../../helpers/common";
import ExpensesService from "./expenses.service";

class ExpensesController extends Controller {
  constructor(service) {
    super(service);
    // this.createBudget = this.createBudget.bind(this);
  }

  // Create a budget
  async createBudgetItems(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user._id };
      const result = await ExpensesService.createBudgetItems(data);
      return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  // update budget item
  async updateBudget(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user?._id };
      const result = await ExpensesService.updateBudget(req.params.id, data);
      return Response.success(res, result, httpStatus.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }

  // Get all budget items for one budget
  async getBudgetItemsForOneBudget(req, res, next) {
    try {
      const result = await ExpensesService.getBudgetItemsForOneBudget(
        req.params.budgetId,
        req.user._id
      );
      return Response.success(res, result, httpStatus.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }

  // delete budget item
  async deleteBudgetItem(req, res, next) {
    try {
      const result = await ExpensesService.deleteBudgetItem(
        req.params.id,
        req.user?._id
      );
      return Response.success(res, result, httpStatus.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }
}

export default new ExpensesController(ExpensesService, "BudgetItems");
