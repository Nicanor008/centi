import { FiHome, FiTrendingUp, FiCompass } from "react-icons/fi";
import { FaPiggyBank, FaCircleNodes } from "react-icons/fa6";
import { FcDebt } from "react-icons/fc";
import { useLocation } from "react-router-dom";

const getCurrentDashboardPath = (path) => {
  switch (path) {
    case "budget":
      return "/budget/analytics";
    case "savings":
      return "/savings/analytics";
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
  { name: "Savings", icon: FaPiggyBank, url: "/savings/analytics" },
  // { name: "Templates", icon: FiStar, url: "#" },
  // { name: "Settings", icon: FiSettings, url: "#" },
];

const savingsLinkItems = [
  ...tt("savings"),
  { name: "Budget", icon: FiTrendingUp, url: "/budget/analytics" },
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
  { name: "Dashboard", icon: FiHome, url: "/dashboard", uniqueId: "dashboard" },
  {
    name: "Financial goals",
    icon: FiCompass,
    url: "/financial-goals",
    uniqueId: "financial-goal",
  },
  {
    name: "Budgets",
    icon: FiTrendingUp,
    url: "/budget/view",
    uniqueId: "budget",
  },
  {
    name: "Savings",
    icon: FaPiggyBank,
    url: "/savings/view",
    uniqueId: "saving",
  },
  { name: "Debt", icon: FcDebt, url: "/debt", uniqueId: "debt" },
  {
    name: "Investments",
    icon: FaCircleNodes,
    url: "/investment",
    uniqueId: "investment",
  },
];

export const LinkItems = () => {
  const location = useLocation();
  const pathname = location.pathname;

  // Check if the URL contains specific keywords
  const hasBudget = pathname.includes("/bu---dget/");
  const hasSavings = pathname.includes("/savi--ngs/");
  const hasDebt = pathname.includes("/de--bt/");
  const hasInvestments = pathname.includes("/i--nvestments/");

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
