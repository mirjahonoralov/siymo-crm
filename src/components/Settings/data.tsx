import user from "../../assets/icons/settings/user.svg";
import trash from "../../assets/icons/settings/trash.svg";
import edit1 from "../../assets/icons/settings/edit1.svg";
import users from "../../assets/icons/settings/users.svg";
import questionMark from "../../assets/icons/settings/question-mark.svg";
import UserProfile from "./components/UserProfile";
import WorkTypes from "./components/JobTypes";
import KindOfClients from "./components/ClientTypes";
import About from "./components/About";
import Cancel from "./components/Cancel";
import ViewTypes from "./components/WorkTypes";

export const icons = [user, edit1, edit1, users, questionMark, trash];

export const pages = [
  {
    page: <UserProfile />,
    path: "user-settings",
  },
  {
    page: <WorkTypes />,
    path: "work-types",
  },
  {
    page: <ViewTypes />,
    path: "view-types",
  },
  {
    page: <KindOfClients />,
    path: "kind-of-activity-clients",
  },
  {
    page: <About />,
    path: "know-about-us",
  },
  {
    page: <Cancel />,
    path: "reason-of-cancel",
  },
];
