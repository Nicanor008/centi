import { Controller } from "../../../helpers/common";
import categoryService from "./category.service";
import { handleResponse as Response } from "../../../helpers";
import httpStatus from "http-status";

class CategoryController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
  async create(req, res, next) {
    try {
      const data = { ...req.body, userId: req.user?._id };
      const result = await categoryService.create(data);
      return Response.success(res, result, httpStatus.CREATED);
    } catch (exception) {
      next(exception);
    }
  }

  async viewAllCategoriesPerUser(req, res, next) {
    console.log("viewAllCategoriesPerUser..........", req);
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
