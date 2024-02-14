import { Service } from "../../helpers/common";
import Investment from "./investment.model";


class InvestmentService extends Service {
  constructor() {
    super(Investment);
  }
}

export default new InvestmentService();
