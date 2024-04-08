import httpStatus from "http-status";
import { handleResponse } from "../../../helpers";
import { Controller } from "../../../helpers/common";
import budgetService from "./budget.service";

class BudgetController extends Controller {
  constructor(service) {
    super(service);
    this.createBudget = this.createBudget.bind(this);
  }

  // Create a budget
  async createBudget(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user?._id };
      const result = await budgetService.createBudget(data);
      return handleResponse.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  async updateBudget(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user?._id };
      const result = await budgetService.updateBudget(req.params.id, data);
      return handleResponse.success(res, result, httpStatus.ACCEPTED);
    } catch (exception) {
      next(exception);
    }
  }

  // View all budgets
  async viewAllBudgets(req, res, next) {
    try {
      let result = await budgetService.viewAllBudgets({ user: req?.user });

      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async findOneBudgetById(req, res, next) {
    try {
      const result = await budgetService.findOneBudgetById(req.params.budgetId);

      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async budgetAnalytics(req, res, next) {
    try {
      const result = await budgetService.budgetAnalytics(req.user);

      return handleResponse.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

// // Get a budget by userId
// router.get("/:userId", async (req, res) => {
//   try {
//     const response = await Budget.find({ userId: req.params.userId });
//     return handleResponse.success(res, response);
//   } catch (error) {
//     return Response.error(res, { message: error });
//   }
// });

// // Get a budget by budget id
// router.get("/:budgetId", async (req, res) => {
//   try {
//     const response = await Budget.findById(req.params.budgetId);
//     if (!response) {
//       return Response.error(res, { message: "Budget not found" });
//     }
//     return handleResponse.success(res, response);
//   } catch (error) {
//     return Response.error(res, { message: error });
//   }
// });

// export default router;

export default new BudgetController(budgetService, "Budget");
