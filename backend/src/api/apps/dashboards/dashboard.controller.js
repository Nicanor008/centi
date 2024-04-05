import { Controller } from "../../../helpers/common";
import dashboardService from "./dashboard.service";
import { handleResponse as Response } from "../../../helpers";

class DashboardController extends Controller {
  constructor(service, name) {
    super(service, name);
  }

  async analytics(req, res, next) {
    try {
      const result = await dashboardService.analytics(req.user);

      return Response.success(res, result);
    } catch (e) {
      next(e);
    }
  }
}

export default new DashboardController(dashboardService, "Dashboard");
