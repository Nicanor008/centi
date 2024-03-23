import { FiHome, FiTrendingUp, FiCompass } from "react-icons/fi";
import { FaPiggyBank, FaCircleNodes } from "react-icons/fa6";
import { FcDebt } from "react-icons/fc";
import { useLocation } from "react-router-dom";

const getCurrentDashboardPath = (path) => {
  switch (path) {
    case "budget":
      return "/budget/dashboard";
    case "savings":
      return "/savings/dashboard";
    case "debt":
      return "/debt/dashboard";
    case "investment":
      return "/investment/dashboard";
    default:
      return "/dashboard";
  }
};

const tt = (path) => [
  {
    name: "Dashboard",
    icon: FiHome,
    url: getCurrentDashboardPath(path),
  },
  { name: "Financial goals", icon: FiCompass, url: "/financial-goals" },
];

const budgetLinkItems = [
  ...tt("budget"),
  { name: "Budgets", icon: FiTrendingUp, url: "/budget/view" },
  { name: "Savings", icon: FaPiggyBank, url: "/savings/dashboard" },
  // { name: "Templates", icon: FiStar, url: "#" },
  // { name: "Settings", icon: FiSettings, url: "#" },
];

const savingsLinkItems = [
  ...tt("savings"),
  { name: "Budget", icon: FiTrendingUp, url: "/budget/dashboard" },
  { name: "Savings", icon: FaPiggyBank, url: "/savings/view" },
];

const debtLinkItems = [
  { name: "Dashboard", icon: FiHome, url: "/debt/dashboard" },
  { name: "Debt", icon: FcDebt, url: "/debt/view" },
  { name: "Financial goals", icon: FiCompass, url: "/financial-goals" },
];

const investmentLinkItems = [
  { name: "Dashboard", icon: FiHome, url: "/investment/dashboard" },
  { name: "Investments", icon: FaCircleNodes, url: "/investment/view" },
  { name: "Financial goals", icon: FiCompass, url: "/financial-goals" },
];

const defaultLinkItems = [
  ...tt(),
  { name: "Budgets", icon: FiTrendingUp, url: "/budget/dashboard" },
  { name: "Savings", icon: FaPiggyBank, url: "/savings/dashboard" },
  { name: "Debt", icon: FcDebt, url: "/debt/dashboard" },
  { name: "Investments", icon: FaCircleNodes, url: "/investment/dashboard" },
];

export const LinkItems = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Check if the URL contains specific keywords
  const hasBudget = pathname.includes("/budget/");
  const hasSavings = pathname.includes("/savings/");
  const hasDebt = pathname.includes("/debt/");
  const hasInvestments = pathname.includes("/investments/");

  switch (true) {
    case hasBudget:
      return budgetLinkItems;
    case hasSavings:
      return savingsLinkItems;
    case hasDebt:
      return debtLinkItems;
    case hasInvestments:
      return investmentLinkItems;
    default:
      return defaultLinkItems;
  }
};
