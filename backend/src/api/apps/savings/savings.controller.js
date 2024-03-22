import { Controller } from "../../helpers/common";
import savingsService from "./savings.service";
import { handleResponse as Response } from "../../helpers";

class SavingsController extends Controller {
  constructor(service, name) {
    super(service, name);
  }

  async create(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user._id };
      const result = await savingsService.create(data);
      return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  async findAll(req, res, next) {
    try {
      let result = await savingsService.findAll({
        userId: req.user._id
      });

      return Response.success(res, result);
    } catch (e) {
      next(e);
    }
  }

  async findOneById(req, res, next) {
    try {
      const result = await savingsService.findOneById({
        id: req.params.id,
        userId: req.user._id
      });

      return Response.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new SavingsController(savingsService, "Savings");
