import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "../components/common/Layout";
import AuthLayout from "../components/common/Layout/AuthLayout";
import {
  Homepage,
  BudgetDashboard,
  ViewUserBudgets,
  CreateUserBudgets,
  ViewUserBudgetItems,
} from "../Pages";
import CreateFinancialGoal from "../Pages/Apps/FinancialGoals/Create";
import ViewUserFinancialGoals from "../Pages/Apps/FinancialGoals/View";

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/">
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Route>

    <Route>
      <Route element={<AuthLayout />}>
        <Route path="financial-goals">
          <Route path="" element={<ViewUserFinancialGoals />} />
          <Route path="add" element={<CreateFinancialGoal />} />
        </Route>
        <Route path="budget">
          <Route path="dashboard" element={<BudgetDashboard />} />
          <Route path="view" element={<ViewUserBudgets />} />
          <Route path="add/:currentStep" element={<CreateUserBudgets />} />
          <Route path="items/:budgetId" element={<ViewUserBudgetItems />} />
        </Route>
        {/* <Route path="*" element={<PageNotFoundScreen />} /> */}
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
