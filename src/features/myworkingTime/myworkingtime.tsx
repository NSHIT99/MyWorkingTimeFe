import React, { useEffect } from "react";
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
import SubmitMyWorkingTime from "./submitMyWorkingtime/submitMyWorkingtime";
import { RootState } from "../../redux/store";
import { resetProgress } from "../../redux/reducer/myworkingtimeReducer";
import { getWorkingtimeOfUserActions } from "../../redux/actions/myworkingtime";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import DeleteWorkingtime from "./deleteMyworkingtime/deleteMyworkingtime";
import EditWorkingtimes from "./editMyworkingTime/editMyworkingTime";
import { getComment } from "../../redux/actions/comment";
import CommentsList from "./comment/comment";
import CreateComments from "./createComment/createComment";

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

  const renderTabPannel = (index: number) => (
    <TabPanel value={tab} index={index}>
      <ViewWork>
        <CreateMyworkingtime value={value} />
        <SubmitMyWorkingTime value={value} />
      </ViewWork>
    </TabPanel>
  );

  let noteWorking: any = [];
  projects.map((item, index) => {
    const working = item.working;
    return working.map((e, i) => {
      if (index === i)
        noteWorking.push({
          projectName: item.projectName,
          taskName: item.taskName,
          projectCode: item.projectCode,
          note: e.note,
          id: e.id,
          status: e.status,
          typeOfWork: e.typeOfWork,
          dateAt: e.dateAt,
          workingTime: e.workingTime,
          projectTaskId: e.projectTaskId,
        });
    });
  });

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
        {[1, 2, 3, 4, 5, 6, 0].map((item) => renderTabPannel(item))}
      </Box>
      <Box>
        <Table
          aria-label="simple table"
          sx={{
            border: 1,
            color: "#e9e9e9",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Tên đồ án
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Phương án làm việc
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Công việc
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Note
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Thời gian làm việc
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Ngày làm việc
              </TableCell>

              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Trạng thái
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Chỉnh sửa
              </TableCell>
              <TableCell
                colSpan={3}
                sx={{
                  background: "#d3d3d3",
                  fontSize: "16px",
                }}
              >
                Xoá
              </TableCell>
            </TableRow>
          </TableHead>
          {noteWorking.map((item: any) => {
            const now = new Date(item.dateAt);
            const dateNow = now.toLocaleDateString("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            });
            return (
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {item.projectName}
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {item.projectCode}
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {item.taskName}
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {item.note}
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {item.workingTime}
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    {dateNow}
                  </TableCell>
                  {item.status == 0 ? (
                    <TableCell
                      colSpan={3}
                      sx={{
                        color: "#6519d6",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Chưa gửi
                    </TableCell>
                  ) : item.status == 1 ? (
                    <TableCell
                      colSpan={3}
                      sx={{
                        color: "yellow",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Đang chờ
                    </TableCell>
                  ) : item.status == 2 ? (
                    <TableCell
                      colSpan={3}
                      sx={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        color: "green",
                      }}
                    >
                      Xác nhận
                    </TableCell>
                  ) : (
                    <TableCell
                      colSpan={3}
                      sx={{
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      Huỷ bỏ
                    </TableCell>
                  )}
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    <EditWorkingtimes workingtime={item} />
                  </TableCell>
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    <DeleteWorkingtime workingtime={item} />
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell
                    sx={{
                      background: "#d3d3d3",
                      fontSize: "16px",
                    }}
                  >
                    <CommentsList idWorkingtime={item.id} />
                  </TableCell>
                  <TableCell
                    sx={{
                      background: "#d3d3d3",
                      fontSize: "16px",
                    }}
                  >
                    <CreateComments idWorkingtime={item.id} />
                  </TableCell>
                </TableRow>
              </TableBody>
            );
          })}
        </Table>
      </Box>
    </ProjectContent>
  );
};

export default Myworkingtime;
