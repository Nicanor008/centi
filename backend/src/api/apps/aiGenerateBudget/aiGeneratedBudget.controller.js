import httpStatus from "http-status";
import { handleResponse } from "../../../helpers";
import { Controller } from "../../../helpers/common";
// import Expenses from "../expenses/expenses.model";
import AIGeneratedBudget from "./aiGeneratedBudget.model";
import AIGeneratedBudgetService from "./aiGeneratedBudget.service";

class AIGeneratedBudgetController extends Controller {
  constructor(service) {
    super(service);
    this.createBudget = this.createBudget.bind(this);
  }

  // Create a budget
  async createBudget(req, res, next) {
    try {
      const data = { ...req.body };
      const result = await AIGeneratedBudgetService.createBudget(data);
      console.log("====================================================")
      console.log('.......result....', result)
      return handleResponse.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  async updateBudget(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user?._id };
      const result = await AIGeneratedBudgetService.updateBudget(req.params.id, data);
      return handleResponse.success(res, result, httpStatus.ACCEPTED);
    } catch (exception) {
      next(exception);
    }
  }

  async deleteBudget(req, res, next) {
    try {
      const result = await AIGeneratedBudget.findByIdAndRemove(req.params.id);

      // if result is successfully, delete all budget items
      // await Expenses.deleteMany({ budgetId: req.params.id });

      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new AIGeneratedBudgetController(AIGeneratedBudgetController, "AIGeneratedBudget");
