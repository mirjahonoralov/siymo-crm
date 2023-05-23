import { Stack } from "@mui/material";
import { Text } from "../../globalStyle";
import { useAppSelector } from "../../hooks/reduxHooks";

type T = {
  title: string;
  children: JSX.Element;
};

const LayoutContainer = ({ title, children }: T) => {
  const { profile } = useAppSelector((state) => state.settings);
  const noPermission = ["account_manager", "office_manager"];

  return (
    <Stack gap="18px">
      <Text
        c="#6C6C6C"
        fs="32px"
        fw="600"
        style={{
          marginLeft: !noPermission.includes(profile.role) ? "140px" : "",
        }}
      >
        {title}
      </Text>
      {children}
    </Stack>
  );
};

export default LayoutContainer;
