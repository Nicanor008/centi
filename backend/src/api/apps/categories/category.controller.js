import httpStatus from "http-status";
import { Controller } from "../../../helpers/common";
import categoryService from "./category.service";
import { handleResponse as Response } from "../../../helpers";

class CategoryController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
  async create(req, res, next) {
    try {
      let data = req.body;
      if (Array.isArray(req.body)) {
        data = data.map(item => ({ ...item, userId: req.user?._id }));
      } else {
        data = { ...req.body, userId: req.user?._id };
      }
      const result = await categoryService.create(data);
      return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  async viewAllCategoriesPerUser(req, res, next) {
    try {
      const result = await categoryService.viewAllCategoriesPerUser(
        req.user?._id
      );
      return Response.success(res, result, httpStatus.SUCCESS);
    } catch (exception) {
      next(exception);
    }
  }
}

export default new CategoryController(categoryService, "Category");
