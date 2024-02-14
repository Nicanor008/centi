import { Controller } from "../../helpers/common";
import savingsService from "./savings.service";
import { handleResponse as Response } from "../../helpers";

class SavingsController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
}

export default new SavingsController(savingsService, "Savings");
