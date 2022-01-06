import React from "react";
import Search from "@mui/icons-material/Search";
import styled from "styled-components";
import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { filter } from "../../../../../../../redux/reducer/projectReducer";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30px;
  margin-top: 10px;
  gap: 20px;
`;
const ListBranch: React.FC = () => {
  const dispatch = useDispatch();
  const [branch, setBranch] = React.useState("Tất cả");
  const [type, setType] = React.useState("Tất cả");
  const handleChangeBranch = (event: SelectChangeEvent) => {
    setBranch(event.target.value);
    dispatch(filter({ branch: event.target.value, type }));
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value);
    dispatch(filter({ type: event.target.value, branch }));
  };

  return (
    <Wrapper>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Lớp</InputLabel>
          <Select
            id="demo-simple-select"
            value={branch}
            onChange={handleChangeBranch}
          >
            <MenuItem value={"Tất cả"}>Tất cả</MenuItem>
            <MenuItem value={0}>None</MenuItem>
            <MenuItem value={1}>58K1</MenuItem>
            <MenuItem value={2}>58K2</MenuItem>
            <MenuItem value={3}>58K3</MenuItem>
            <MenuItem value={4}>58K4</MenuItem>
            <MenuItem value={5}>59K1</MenuItem>
            <MenuItem value={6}>59K2</MenuItem>
            <MenuItem value={7}>59K3</MenuItem>
            <MenuItem value={8}>59K4</MenuItem>
            <MenuItem value={9}>60K1</MenuItem>
            <MenuItem value={10}>60K2</MenuItem>
            <MenuItem value={11}>60K3</MenuItem>
            <MenuItem value={12}>60K4</MenuItem>
            <MenuItem value={13}>61K1</MenuItem>
            <MenuItem value={14}>61K2</MenuItem>
            <MenuItem value={15}>61K3</MenuItem>
            <MenuItem value={16}>61K4</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">Nhiệm vụ</InputLabel>
          <Select
            id="demo-simple-select"
            value={type}
            onChange={handleChangeType}
          >
            <MenuItem value={"Tất cả"}>Tất cả</MenuItem>
            <MenuItem value={0}>Nhóm trưởng</MenuItem>
            <MenuItem value={1}>Giáo viên phụ trách</MenuItem>
            <MenuItem value={2}>Thành viên</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <TextField
          id="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          style={{ width: "270px" }}
          label="Tìm kiếm theo tên"
          variant="standard"
        />
      </div>
    </Wrapper>
  );
};

export default ListBranch;
