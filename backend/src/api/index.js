import { Router } from "express";
import auth from "./auth";
import users from "./users";
import configs from "./configs";
import Budget from "./apps/budgets";
import Categories from "./apps/categories";
import FinancialGoals from "./apps/financialGoals";
import Savings from "./apps/savings";
import Dashboard from "./apps/dashboards";
import Expenses from "./apps/expenses";
import AIGeneratedBudget from "./apps/aiGenerateBudget";

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/configs", configs);

router.use("/budget", Budget);
router.use("/expenses", Expenses);

router.use("/category", Categories);

router.use("/financial-goals", FinancialGoals);
router.use("/savings", Savings);
router.use("/dashboard", Dashboard);

router.use("/generate-budget", AIGeneratedBudget);

export default router;
