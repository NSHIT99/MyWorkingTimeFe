import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getWorkingtime } from "../../redux/actions/workingtime";
import { workingtimeSelector } from "../../redux/reducer/workingtimeReducer";
import ListWorkingTime from "./listWorkingtime/listWorkingtime";
import AccpetWorkingtime from "./acceptWorkingtime/acceptWorkingtime";

const ProjectContent = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderProject = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const TitleHeader = styled.div`
  font-size: 22px;
`;

const Content = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  gap: 500px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const Btn = styled.div`
  display: flex;
  justify-content: space-around;
`;

const WorkingTime: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const [monday, setMonday] = React.useState("");
  const [sunday, setSunday] = React.useState("");
  const [status, setStatus] = React.useState("0");

  const dispatch = useDispatch();
  useEffect(() => {
    if (value) {
      const curr = new Date(value);
      const firstday = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + 1)
      );
      const formatFirstDay =
        firstday.getFullYear() +
        "-" +
        (firstday.getMonth() > 8
          ? firstday.getMonth() + 1
          : "0" + (firstday.getMonth() + 1)) +
        "-" +
        (firstday.getDate() > 9
          ? firstday.getDate()
          : "0" + firstday.getDate());

      const lastday = new Date(
        curr.setDate(curr.getDate() - curr.getDay() + 7)
      );
      const formatLastDay =
        lastday.getFullYear() +
        "-" +
        (lastday.getMonth() > 8
          ? lastday.getMonth() + 1
          : "0" + (lastday.getMonth() + 1)) +
        "-" +
        (lastday.getDate() > 9 ? lastday.getDate() : "0" + lastday.getDate());

      setMonday(formatFirstDay);
      setSunday(formatLastDay);
      dispatch(
        getWorkingtime({
          startDate: formatFirstDay,
          endDate: formatLastDay,
          status: parseInt(status),
        })
      );
    }
  }, [value]);

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [category, setCategory] = React.useState("0");

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const [button, setButton] = React.useState("0");

  const handleStatus0 = () => {
    dispatch(
      getWorkingtime({
        startDate: monday,
        endDate: sunday,
        status: 0,
      })
    );
    setButton("0");
  };
  const handleStatus1 = () => {
    dispatch(
      getWorkingtime({
        startDate: monday,
        endDate: sunday,
        status: 1,
      })
    );
    setButton("1");
  };
  const handleStatus2 = () => {
    dispatch(
      getWorkingtime({
        startDate: monday,
        endDate: sunday,
        status: 2,
      })
    );
    setButton("2");
  };
  const handleStatus3 = () => {
    dispatch(
      getWorkingtime({
        startDate: monday,
        endDate: sunday,
        status: 3,
      })
    );
    setButton("3");
  };
  const handleStatus = () => {
    dispatch(getWorkingtime({}));
  };

  const WorkingtimeStatus = useSelector(
    workingtimeSelector.getAllWorkingtimeSelector
  );
  const WorkingtimeStatus0 = useSelector(
    workingtimeSelector.getAllWorkingtimeStatus0
  );
  const WorkingtimeStatus1 = useSelector(
    workingtimeSelector.getAllWorkingtimeStatus1
  );
  const WorkingtimeStatus2 = useSelector(
    workingtimeSelector.getAllWorkingtimeStatus2
  );
  const WorkingtimeStatus3 = useSelector(
    workingtimeSelector.getAllWorkingtimeStatus3
  );

  return (
    <ProjectContent>
      <HeaderProject>
        <TitleHeader>Quản lý thời gian làm việc</TitleHeader>
      </HeaderProject>
      <hr />
      <Content>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label="Custom input"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={({ inputRef, inputProps, InputProps }) => (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <input ref={inputRef} {...inputProps} />
                {InputProps?.endAdornment}
              </Box>
            )}
          />
        </LocalizationProvider>
      </Content>
      <Footer>
        <FormControl variant="standard" sx={{ minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Trạng thái
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={status}
            onChange={handleChangeStatus}
            label="Trạng thái"
          >
            <MenuItem value={0} onClick={handleStatus0}>
              Chưa gửi ({WorkingtimeStatus0.length})
            </MenuItem>
            <MenuItem value={1} onClick={handleStatus1}>
              Đang chờ ({WorkingtimeStatus1.length})
            </MenuItem>
            <MenuItem value={2} onClick={handleStatus2}>
              Xác nhận ({WorkingtimeStatus2.length})
            </MenuItem>
            <MenuItem value={3} onClick={handleStatus3}>
              Huỷ bỏ ({WorkingtimeStatus3.length})
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ minWidth: 100 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Thể loại
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={category}
            onChange={handleChangeCategory}
            label="Thể loại"
          >
            <MenuItem value={0}>Tất cả</MenuItem>
            <MenuItem value={1}>Làm việc nhóm</MenuItem>
            <MenuItem value={2}>Làm việc cá nhân</MenuItem>
          </Select>
        </FormControl>
        {button == "1" ? (
          <Btn>
            <AccpetWorkingtime />
            <Button variant="outlined" color="error">
              Huỷ bỏ
            </Button>
          </Btn>
        ) : button == "2" ? (
          <Button variant="outlined" color="error">
            Huỷ bỏ
          </Button>
        ) : button == "3" ? (
          <AccpetWorkingtime />
        ) : (
          <div></div>
        )}
      </Footer>
      <ListWorkingTime />
    </ProjectContent>
  );
};

export default WorkingTime;
