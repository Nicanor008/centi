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
  CreateFinancialGoal,
  ViewUserFinancialGoals,
  Login,
  Signup,
  ForgotPassword,
  ResetPassword,
  UserProfile,
  SavingsDashboard,
  ViewAllSavings,
  CreateSavingGoal,
} from "../Pages";

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/">
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:email" element={<ResetPassword />} />
      </Route>
    </Route>

    <Route>
      <Route element={<AuthLayout />}>
        <Route path="user">
          <Route path="profile" element={<UserProfile />} />
        </Route>
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
        <Route path="savings">
          <Route path="dashboard" element={<SavingsDashboard />} />
          <Route path="view" element={<ViewAllSavings />} />
          <Route path="add" element={<CreateSavingGoal />} />
          {/* <Route path="items/:budgetId" element={<ViewUserBudgetItems />} /> */}
        </Route>
        {/* <Route path="*" element={<PageNotFoundScreen />} /> */}
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
