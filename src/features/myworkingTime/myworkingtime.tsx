import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DatePicker";
import CreateMyworkingtime from "./createMyworkingtime/createMyworkingtime";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SubmitMyWorkingTime from "./submitMyWorkingtime/submitMyWorkingtime";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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

const ViewWork = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Footer = styled.div``;

const Myworkingtime: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const [tab, setTab] = React.useState(0);
  const [dayByDate, setDayByDate] = React.useState<number>(new Date().getDay());
  const handleChange = (event: any, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    setTab(dayByDate - 1);
  }, [dayByDate]);

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
              setDayByDate(new Date(newValue!).getDay());
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
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Monday" {...a11yProps(0)} />
            <Tab label="Tuesday" {...a11yProps(1)} />
            <Tab label="Wednesday" {...a11yProps(2)} />
            <Tab label="Thursday" {...a11yProps(3)} />
            <Tab label="Friday" {...a11yProps(4)} />
            <Tab label="Saturday" {...a11yProps(5)} />
            <Tab label="Sunday" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <ViewWork>
            <CreateMyworkingtime />
           <SubmitMyWorkingTime value={value} />
          </ViewWork>
        </TabPanel>
      </Box>
      <Footer></Footer>
    </ProjectContent>
  );
};

export default Myworkingtime;
