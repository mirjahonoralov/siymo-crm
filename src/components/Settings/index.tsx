import useSearch from "../../hooks/useSearch";
import Categories from "./components/Categories";
import { pages } from "./data";
import { useAppSelector } from "../../hooks/reduxHooks";
import UserProfile from "./components/UserProfile";
import ToBack from "../Common/ToBack";

const Settings = () => {
  const { profile } = useAppSelector((state) => state.settings);
  const query = useSearch();
  const noPermission = ["account_manager", "office_manager"];

  if (noPermission.includes(profile.role)) return <UserProfile />;

  if (!query.get("action")) return <Categories />;

  return (
    <>
      <ToBack to="/settings" left="none" top="none" />

      {pages.find((item) => item.path === query.get("action"))?.page}
    </>
  );
};

export default Settings;
