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
} from "../Pages";

export const routes = createRoutesFromElements(
  <Route>
    <Route path="/">
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
      </Route>
    </Route>

    <Route
      path="budget"
      // element={
      //   <RequireAuth>
      //     <Outlet />
      //   </RequireAuth>
      // }
    >
      <Route>
        <Route element={<AuthLayout />}>
          <Route path="dashboard" element={<BudgetDashboard />} />
          <Route path="view" element={<ViewUserBudgets />} />
          <Route path="add" element={<CreateUserBudgets />} />

          {/* <Route path="*" element={<PageNotFoundScreen />} /> */}
        </Route>
      </Route>
    </Route>
  </Route>
);

export const router = createBrowserRouter(routes);
