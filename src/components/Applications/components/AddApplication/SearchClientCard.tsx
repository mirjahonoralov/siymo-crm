import React from "react";
import { Card, CardBody, CardTop, SearchInputWrapper } from "../Header/style";
import CustomInput from "../../../Common/CustomInput";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import searchIcon from "../../../../assets/icons/applications/search.svg";
import manImg from "../../../../assets/icons/applications/man.svg";
import useSearch from "../../../../hooks/useSearch";
import { useLocation, useNavigate } from "react-router-dom";
import { appsDataT } from "../../../../store/slices/applicationsSlice";
import UseReplace from "../../../../hooks/useReplace";
import { clientDataT } from ".";
import { useAppSelector } from "../../../../hooks/reduxHooks";
import { dataType } from "../../../../store/slices/contactSlice";

type T = {
  editingApp: appsDataT | null;
  setClientData: (arg: clientDataT) => void;
  setCheckErrors: (arg: boolean) => void;
  selectContact: (id: number) => void;
  selectedContact: dataType | null;
};

const SearchClientCard: React.FC<T> = ({
  editingApp,
  setClientData,
  setCheckErrors,
  selectContact,
  selectedContact,
}) => {
  const { data: contacts } = useAppSelector((state) => state.contact);
  const query = useSearch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Card>
      <CardTop>Поиск по базе</CardTop>
      <CardBody>
        <SearchInputWrapper>
          <CustomInput
            name="search"
            showError={false}
            value={query.get("search-client-name") || ""}
            onChange={(e) => {
              if (!editingApp) {
                setCheckErrors(false);
                navigate(
                  `${pathname}${UseReplace("search-client-name", String(e))}`
                );
              }
            }}
            fullWidth
            type="text"
            height="33px"
            placeholder="Введите наименование …"
            pl="10px"
            pr="40px"
          />
          <img src={searchIcon} alt="" />
        </SearchInputWrapper>

        {query.get("search-client-name") && contacts.results?.length > 0 ? (
          <List>
            {contacts.results.slice(0, 6).map((item) => (
              <ListItem disablePadding key={item.id}>
                <ListItemButton
                  onClick={() => {
                    selectContact(item.id!);
                    setClientData({
                      activity: item.activity,
                      name: item.name,
                      telegram: item.telegram,
                      phone_number: item.phone_number,
                      person_contact: item.person_contact,
                      image: item.image as string,
                    });
                  }}
                  style={{
                    padding: "5px 15px",
                    marginTop: "7px",
                    background:
                      selectedContact?.id === item.id
                        ? "var(--primary)"
                        : "#e4e4e4",
                    color: selectedContact?.id === item.id ? "#fff" : "#000",
                  }}
                >
                  <ListItemText
                    sx={{
                      span: {
                        fs: "16px",
                        fontWeight: "400",
                        fontFamily: "Inter !important",
                      },
                    }}
                    primary={item.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <img src={manImg} height="250px" alt="" />
        )}
      </CardBody>
    </Card>
  );
};

export default SearchClientCard;
