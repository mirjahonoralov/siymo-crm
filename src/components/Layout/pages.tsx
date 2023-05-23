import Applications from "../Applications";
import Contact from "../Contact";
import Employees from "../Employees";
import Process from "../Process";
import Settings from "../Settings";
import Statistics from "../Statistics";

export const pages = [
  {
    path: "/statistics",
    component: <Statistics />,
    permission: [
      "director",
      "crm_manager",
      "finance_director",
      "office_manager",
      "account_manager",
    ],
  },
  {
    path: "/applications",
    component: <Applications />,
    permission: [
      "director",
      "crm_manager",
      "finance_director",
      "account_manager",
    ],
  },
  {
    path: "/contact",
    component: <Contact />,
    permission: [
      "director",
      "crm_manager",
      "finance_director",
      "office_manager",
      "account_manager",
    ],
  },
  {
    path: "/process",
    component: <Process />,
    permission: [
      "director",
      "crm_manager",
      "finance_director",
      "office_manager",
    ],
  },
  {
    path: "/employees",
    component: <Employees />,
    permission: ["director", "crm_manager", "office_manager"],
  },
  {
    path: "/settings",
    component: <Settings />,
    permission: [
      "director",
      "crm_manager",
      "finance_director",
      "office_manager",
      "account_manager",
    ],
  },
];
