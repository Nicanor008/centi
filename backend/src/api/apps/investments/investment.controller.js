import { Controller } from "../../helpers/common";
import investmentService from "./investment.service";
import { handleResponse as Response } from "../../helpers";

class InvestmentController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
}

export default new InvestmentController(investmentService, "Investment");
