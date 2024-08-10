import { Service } from "../../../helpers/common";
import Dashboard from "./dashboard.model";
import budgetService from "../budgets/budget.service";
import savingsService from "../savings/savings.service";
import financialGoalsService from "../financialGoals/financialGoals.service";

class DashboardService extends Service {
  constructor() {
    super(Dashboard);
  }

  async analytics(user) {
    const budget = await budgetService.viewAllBudgets({ user, sortBy: 1 });

    const totalBudgetExpensesAmount = budget?.data?.reduce(
      (acc, item) => acc + item.plannedExpenses,
      0
    );

    const totalNumberofBudgetItems = budget?.data?.reduce(
      (acc, item) => acc + item.budgetItemsCount,
      0
    );

    // calculate budget expenses
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // Months are zero-indexed, so we add 1
    const currentYear = currentDate.getFullYear();

    // Filter budget items created in the current month
    const budgetItemsThisMonth = budget?.data?.filter(budgetItem => {
      const createdAt = new Date(budgetItem.createdAt);
      const itemMonth = createdAt.getMonth() + 2;
      const itemYear = createdAt.getFullYear();
      return itemMonth === currentMonth && itemYear === currentYear;
    });

    const totalPlannedExpensesThisMonth = budgetItemsThisMonth.reduce((total, budget) => {
      const budgetItemsTotal = budget.budgetItems.reduce((sum, item) => sum + item.actualExpenses, 0);
      return total + budgetItemsTotal;
    }, 0);

    // category counts
    const categoryCount = {};

    // Iterate over each budget item
    budget?.data?.forEach(budgetItem => {
      // Extract categories from the budget item
      const categories = budgetItem?.category || [];

      // Iterate over each category in the budget item
      categories.forEach(category => {
        const { label } = category;

        // Increment the count for the categoryd
        if (categoryCount[label]) {
          categoryCount[label]++;
        } else {
          categoryCount[label] = 1;
        }
      });
    });

    // savings
    const savings = await savingsService.findAll({
      userId: user._id
    });

    // financial goals
    const financialGoal = await financialGoalsService.viewAllGoals({
      userId: user._id
    });

    const result = {
      budget: {
        totalNumberofBudget: budget.data.length,
        totalNumberofBudgetItems,
        totalBudgetExpensesAmount,
        totalPlannedExpensesThisMonth,
        totalNumberofBudgetThisMonth: budgetItemsThisMonth.length,
        budget: budget.data
      },
      savings: {
        total: savings.data.length,
        totalSavingsAmount: savings.data.reduce(
          (acc, curr) => acc + curr.currentAmount,
          0
        ),
        savings: savings.data
      },
      financialGoal: {
        total: financialGoal.data.length,
        totalFinancialGoalTargetAmount: financialGoal.data.reduce(
          (acc, curr) => acc + curr.targetAmount,
          0
        )
      }
    };
    return result;
  }
}

export default new DashboardService();
