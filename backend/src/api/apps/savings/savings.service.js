import { Service } from "../../helpers/common";
import Savings from "./savings.model";


class SavingsService extends Service {
  constructor() {
    super(Savings);
  }
}

export default new SavingsService();
