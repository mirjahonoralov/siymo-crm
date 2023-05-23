import React, { useState, useEffect } from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { Card, CardBody, CardTop, SearchInputWrapper } from "../../style";
import { useLocation, useNavigate } from "react-router-dom";
import CustomInput from "../../../Common/CustomInput";
import { processPostT } from "../../../../store/slices/processSlice";
import UseReplace from "../../../../hooks/useReplace";
import { getContact } from "../../../../store/actions/contactActions";
import { useAppDispatch, useAppSelector } from "../../../../hooks/reduxHooks";
import useSearch from "../../../../hooks/useSearch";
import searchIcon from "../../../../assets/icons/applications/search.svg";
import manImg from "../../../../assets/icons/applications/man.svg";

type T = {
  processData: processPostT;
  setCheckErrors: (arg: boolean) => void;
  selectContact: (id: number) => void;
};

const SearchClientCard: React.FC<T> = ({
  processData,
  setCheckErrors,
  selectContact,
}) => {
  const { data: contacts } = useAppSelector((state) => state.contact);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const query = useSearch();
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (query.get("search-name")) dispatch(getContact(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, search]);

  return (
    <Card gridRow="1 / 3">
      <CardTop>Поиск по базе</CardTop>
      <CardBody>
        <SearchInputWrapper>
          <CustomInput
            name="search"
            showError={false}
            value={search}
            onChange={(e) => {
              setSearch(e as string);
              setCheckErrors(false);
              navigate(`${pathname}${UseReplace("search-name", String(e))}`);
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
        {search && contacts.results?.length > 0 ? (
          <List>
            {contacts.results.slice(0, 13).map((item, index) => (
              <ListItem disablePadding key={item.id}>
                <ListItemButton
                  onClick={() => selectContact(item.id!)}
                  style={{
                    padding: "5px 15px",
                    marginTop: "7px",
                    background:
                      processData?.client === item.id
                        ? "var(--primary)"
                        : "#e4e4e4",
                    color: processData?.client === item.id ? "#fff" : "#000",
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
