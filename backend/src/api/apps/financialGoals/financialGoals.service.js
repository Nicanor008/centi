import { Service } from "../../../helpers/common";
import FinancialGoals from "./financialGoals.model";

class FinancialGoalsService extends Service {
  constructor() {
    super(FinancialGoals);
  }

  async create(data) {
    return await FinancialGoals.create(data);
  }

  async viewAllGoals({ userId, sortBy }) {
    const response = await FinancialGoals.aggregate([
      {
        $match: { userId }
      },
      {
        $sort: { createdAt: sortBy ?? -1 }
      }
    ]);

    const result = {
      total: response.length,
      data: response
    };
    return result;
  }

  async findOneById({ id, userId }) {
    const response = await FinancialGoals.findOne({ _id: id, userId });
    if (response) {
      return response;
    } else throw new Error("Financial Goal not found!");
  }
}

export default new FinancialGoalsService();
