import { Controller } from "../../helpers/common";
import debtService from "./debt.service";
import { handleResponse as Response } from "../../helpers";

class DebtController extends Controller {
  constructor(service, name) {
    super(service, name);
  }
}

export default new DebtController(debtService, "Debt");
