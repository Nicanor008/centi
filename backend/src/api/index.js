import { Router } from "express";
import auth from "./auth";
import users from "./users";
import configs from "./configs";
import Budget from "./apps/budgets";
import BudgetItems from "./apps/budgetItems";
import Categories from "./apps/categories";
import FinancialGoals from "./apps/financialGoals";
import Savings from "./apps/savings";

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/configs", configs);

router.use("/budget", Budget);
router.use("/budget-items", BudgetItems);

router.use("/category", Categories);

router.use("/financial-goals", FinancialGoals);
router.use("/savings", Savings);

export default router;
