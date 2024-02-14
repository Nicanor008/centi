import { Service } from "../../helpers/common";
import Debt from "./debt.model";


class DebtService extends Service {
  constructor() {
    super(Debt);
  }
}

export default new DebtService();
