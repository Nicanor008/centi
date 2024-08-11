import config from "../../../config";
import { Service } from "../../../helpers/common";
import AIGeneratedBudget from "./aiGeneratedBudget.model";

import OpenAI from "openai";

const client = new OpenAI({
  apiKey: config.openai.OPENAI_API_KEY,
});

class AIGeneratedBudgetService extends Service {
  constructor(model) {
    super(model);
    this.viewAllBudgets = this.viewAllBudgets.bind();
  }

  async generateBudget(budget, description) {
    const prompt = `Generate a budget plan for a user with a budget of ${budget} and the following requirements: ${description}`;
    const completion = await client.chat.completions.create({
      messages: [{ role: "system", content: prompt }],
      model: "gpt-3.5-turbo",
    });
    return completion.choices[0]
  }

  async createBudget(data) {
    const generatedBudget = await this.generateBudget(data.userBudget, data.userDescription);
    data.generatedBudget = generatedBudget;
    // data.generatedBudget = generatedBudget;
    return await AIGeneratedBudget.create(data);
  }

  async updateBudget(id, data) {
    const generatedBudget = await this.generateBudget(data.budget, data.description);
    data.generatedBudget = generatedBudget;
    return await AIGeneratedBudget.findOneAndUpdate({ _id: id }, data);
  }

  async viewAllBudgets({ user }) {
    // async viewAllBudgets({ user, sortBy }) {
    const response = await AIGeneratedBudget.aggregate([
      {
        $match: { userId: user?._id }
      },
      // {
      //   $lookup: {
      //     from: "budgetitems",
      //     localField: "_id",
      //     foreignField: "budgetId",
      //     as: "budgetItems"
      //   }
      // },
      // {
      //   $addFields: {
      //     budgetItemsCount: { $size: "$budgetItems" }
      //   }
      // },
      {
        $sort: { createdAt: 1 }
      }
    ]);

    // const userAllExpenses = await Expenses.find({
    //   userId: user?._id
    // });

    // const totalUserAllExpenses = userAllExpenses.reduce((acc, curr) => acc + curr.actualExpenses, 0)

    const result = {
      total: response.length,
      // totalExpenses: totalUserAllExpenses,
      data: response
    };
    return result;
  }

  async findOneBudgetById(budgetId) {
    const response = await AIGeneratedBudget.findById({ _id: budgetId });
    if (response) {
      return response;
    } else throw new Error("Budget not found!");
  }
}

export default new AIGeneratedBudgetService();
