import { Service } from "../../helpers/common";
import Savings from "./savings.model";

class SavingsService extends Service {
  constructor() {
    super(Savings);
  }

  async create(data) {
    return await FinancialGoals.create(data);
  }

  async findAll({ userId, sortBy }) {
    const response = await Savings.aggregate([
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
    const response = await Savings.findOne({ _id: id, userId });

    if (response) {
      return response;
    } else throw new Error("Savings goal not found!");
  }
}

export default new SavingsService();
