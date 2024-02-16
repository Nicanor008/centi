// import express from "express";
import httpStatus from "http-status";
import { handleResponse } from "../../../helpers";
import { Controller } from "../../../helpers/common";
// import { handleResponse as Response } from "../../helpers";
// import Budget from "./budget.model";
import budgetService from "./budget.service";

// const router = express.Router();

// Create a budget
class BudgetController extends Controller {
  constructor() {
    super();
    this.createBudget = this.createBudget.bind(this);
  }

  async createBudget(req, res, next) {
    try {
      const data = req.body;
      const result = await budgetService.createBudget(data);
      return handleResponse.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }
}

// View all budgets
// router.get("/all", async (req, res) => {
//   try {
//     const allBudgets = await Budget.find();
//     return handleResponse.success(res, allBudgets);
//   } catch (error) {
//     return Response.error(res, { message: error });
//   }
// });

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
