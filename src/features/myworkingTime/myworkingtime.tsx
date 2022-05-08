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
import { RootState } from "../../redux/store";
import { resetProgress } from "../../redux/reducer/myworkingtimeReducer";
import { getWorkingtimeOfUserActions } from "../../redux/actions/myworkingtime";

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
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const Myworkingtime: React.FC = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  let dateMondayToSunday: string[] = [];
  if (value) {
    const current = new Date(value);
    const first = current.getDate() - current.getDay();
    for (let i = 1; i < 8; i++) {
      const next = new Date(current.getTime());
      next.setDate(first + i);
      const date = new Date(next).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      dateMondayToSunday.push(date);
    }
  }

  const [tab, setTab] = React.useState(0);
  const [dayByDate, setDayByDate] = React.useState<number>(new Date().getDay());
  const handleChange = (event: any, newValue: number) => {
    setTab(newValue);
  };
  useEffect(() => {
    setTab(dayByDate - 1);
  }, [dayByDate]);

  const dispatch = useDispatch();
  const progress = useSelector(
    (state: RootState) => state.myworkingtime.progress
  );
  useEffect(() => {
    if (progress === "done") {
      dispatch(resetProgress());
    }
  }, [progress, dispatch]);

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

      dispatch(
        getWorkingtimeOfUserActions({
          startDate: formatFirstDay,
          endDate: formatLastDay,
        })
      );
    }
  }, [value]);

  const projects = useSelector(
    (state: RootState) => state.myworkingtime.workingtimeofuser
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
          <div>
            {projects.map((item) => {
              const working = item.working;
              working.map((e) => {
                const now = new Date(e.dateAt);
                const dateNow = now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });
                if (dateNow === dateMondayToSunday[0]) {
                  return (
                    <div>
                      <div>
                        [{item.projectName}][{item.projectCode}]---
                        {item.taskName}
                      </div>
                      <div>{dateNow}</div>
                    </div>
                  );
                }
              });
            })}
            <ViewWork>
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <div>
            {projects.map((item) => {
              const working = item.working;
              working.map((e) => {
                const now = new Date(e.dateAt);
                const dateNow = now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                if (dateNow === dateMondayToSunday[1]) {
                  return (
                    <div>
                      <div>
                        [{item.projectName}][{item.projectCode}]---
                        {item.taskName}
                      </div>
                      <div>{dateNow}</div>
                    </div>
                  );
                }
              });
            })}
            <ViewWork>
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <div>
            <ViewWork>
              {projects.map((item) => {
                const working = item.working;
                working.map((e) => {
                  const now = new Date(e.dateAt);
                  const dateNow = now.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  });

                  if (dateNow === dateMondayToSunday[2]) {
                    return (
                      <div>
                        <div>
                          [{item.projectName}][{item.projectCode}]---
                          {item.taskName}
                        </div>
                        <div>{dateNow}</div>
                      </div>
                    );
                  }
                });
              })}
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <div>
            {projects.map((item) => {
              const working = item.working;
              working.map((e) => {
                const now = new Date(e.dateAt);
                const dateNow = now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                if (dateNow === dateMondayToSunday[3]) {
                  return (
                    <div>
                      <div>
                        [{item.projectName}][{item.projectCode}]---
                        {item.taskName}
                      </div>
                      <div>{dateNow}</div>
                    </div>
                  );
                }
              });
            })}
            <ViewWork>
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <div>
            {projects.map((item) => {
              const working = item.working;
              working.map((e) => {
                const now = new Date(e.dateAt);
                const dateNow = now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                if (dateNow === dateMondayToSunday[4]) {
                  return (
                    <div>
                      <div>
                        [{item.projectName}][{item.projectCode}]---
                        {item.taskName}
                      </div>
                      <div>{dateNow}</div>
                    </div>
                  );
                }
              });
            })}
            <ViewWork>
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <div>
            {projects.map((item) => {
              const working = item.working;
              working.map((e) => {
                const now = new Date(e.dateAt);
                const dateNow = now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                if (dateNow === dateMondayToSunday[5]) {
                  return (
                    <div>
                      <div>
                        [{item.projectName}][{item.projectCode}]---
                        {item.taskName}
                      </div>
                      <div>{dateNow}</div>
                    </div>
                  );
                }
              });
            })}
            <ViewWork>
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <div>
            {projects.map((item) => {
              const working = item.working;
              working.map((e) => {
                const now = new Date(e.dateAt);
                const dateNow = now.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                });

                if (dateNow === dateMondayToSunday[6]) {
                  return (
                    <div>
                      <div>
                        [{item.projectName}][{item.projectCode}]---
                        {item.taskName}
                      </div>
                      <div>{dateNow}</div>
                    </div>
                  );
                }
              });
            })}
            <ViewWork>
              <CreateMyworkingtime value={value} />
              <SubmitMyWorkingTime value={value} />
            </ViewWork>
          </div>
        </TabPanel>
      </Box>
    </ProjectContent>
  );
};

export default Myworkingtime;
