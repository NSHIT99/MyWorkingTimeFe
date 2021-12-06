import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import Search from "@mui/icons-material/Search";
import { ISearchBar } from "../../../../interfaces/task/taskType";

const SearchContainer = styled.div`
  margin-left: 200px;
`;

const SearchTask: React.FC<ISearchBar> = ({ setSearchKey }) => {
  const [inputText, setInputText] = useState("");
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setSearchKey(inputText);
    }
  };

  const onChange = (e: any): void => {
    setInputText(e.currentTarget.value.trim());
    if (e.currentTarget.value.trim().length === 0)
      setSearchKey(e.currentTarget.value.trim());
  };
  return (
    <SearchContainer>
      <TextField
        id="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
        style={{ width: "300px" }}
        label="Tìm kiếm theo tên"
        variant="outlined"
        onChange={(e) => onChange(e)}
        onKeyUp={onKeyUp}
      />
    </SearchContainer>
  );
};

export default SearchTask;
