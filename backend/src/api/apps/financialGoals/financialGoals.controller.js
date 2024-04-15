import httpStatus from "http-status";
import financialGoalsService from "./financialGoals.service";
import { handleResponse as Response } from "../../../helpers";
import { Controller } from "../../../helpers/common";
import FinancialGoals from "./financialGoals.model";
import Budget from "../budgets/budget.model";
import Expenses from "../expenses/expenses.model";

class FinancialGoalsController extends Controller {
  constructor(service, name) {
    super(service, name);
  }

  async create(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user._id };
      const result = await financialGoalsService.create(data);
      return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  async viewAllGoals(req, res, next) {
    try {
      let result = await financialGoalsService.viewAllGoals({
        userId: req.user._id
      });

      return Response.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async findOneById(req, res, next) {
    try {
      const result = await financialGoalsService.findOneById({
        id: req.params.id,
        userId: req.user._id
      });

      return Response.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async groupedFinancialGoals(req, res, next) {
    try {
      const result = await financialGoalsService.groupedFinancialGoals({
        user: req.user
      });
      return Response.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async deleteFinancialGoal(req, res, next) {
    try {
      const result = await FinancialGoals.findByIdAndRemove(req.params.id);
      // const result = await Budget.findByIdAndRemove(req.params.id);

      // if result is successfully, delete all budget items
      await Expenses.deleteMany({ financialGoal: req.params.id });
      await Budget.deleteMany({ financialGoal: req.params.id });

      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new FinancialGoalsController(
  financialGoalsService,
  "FinancialGoals"
);
