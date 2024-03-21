import httpStatus from "http-status";
import financialGoalsService from "./financialGoals.service";
import { handleResponse as Response } from "../../../helpers";
import { Controller } from "../../../helpers/common";

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
}

export default new FinancialGoalsController(
  financialGoalsService,
  "FinancialGoals"
);
