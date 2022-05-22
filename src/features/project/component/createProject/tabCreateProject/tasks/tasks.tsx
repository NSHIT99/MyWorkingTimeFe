import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { RootState } from "../../../../../../redux/store";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  pushTask,
  removeTask,
  updateBillable,
} from "../../../../../../redux/reducer/projectReducer";
import { ITaskReq } from "../../../../../../interfaces/task/taskType";
import TextField from "@mui/material/TextField";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const Wrapper = styled.div``;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  border-bottom: 1px solid lightgray;
`;
const NavHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const ViewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  gap: 43.2%;
`;
const LeftViewHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const RightViewHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 205px;
`;
const RightNav = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 200px;
`;

const LeftNav = styled.div``;

const ViewSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-top: 30px;
`;
const RightSelect = styled.div``;
const Text = styled.div`
  font-size: 15px;
  font-weight: 700;
`;
const ViewTask = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 15px;
  justify-content: space-between;
`;
const LeftView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;
const RightView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 200px;
`;
const TextView = styled.div`
  font-size: 15px;
`;

const FormList = styled.div`
  display: flex;
  padding-bottom: 20px;
  align-items: center;
`;

const Tasks: React.FC = () => {
  const dispatch = useDispatch();

  const [openSelectTask, setOpenSelectTask] = React.useState(true);
  const handleClickSelectTask = () => {
    setOpenSelectTask(!openSelectTask);
  };
  const tasks = useSelector((state: RootState) => state.project.viewTask);
  const selectedTasks = useSelector(
    (state: RootState) => state.project.selectedTasks
  );

  const [check, setCheck] = React.useState<boolean>(false);

  const handlePushTask = (task: ITaskReq) => {
    dispatch(pushTask(task));
  };
  const handleRemoveTask = (task: ITaskReq) => {
    dispatch(removeTask(task));
  };

  return (
    <Wrapper>
      <Header>
        <Table aria-label="simple table" sx={{ border: 0 }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  border: "1px solid #ccc",
                  background: "#e9e9e9",
                  textAlign: "center",
                },
              }}
            >
              <TableCell scope="row">Thêm công việc</TableCell>
              <TableCell scope="row">Công việc</TableCell>
              <TableCell scope="row">Loại công việc</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTasks.map((task, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& td": { border: "1px solid #ccc" },
                  }}
                >
                  <TableCell scope="row">
                    <AddCircleOutlineIcon onClick={() => handleRemoveTask(task)} />
                  </TableCell>
                  <TableCell scope="row">
                    <TextView>{task.name}</TextView>
                  </TableCell>
                  <TableCell scope="row">
                    {task.type === 0 ? (
                      <TextView>Công việc chung</TextView>
                    ) : (
                      <TextView>Công việc khác</TextView>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Header>
      <ViewSelect>
        <TextView>Danh sách công việc</TextView>
        <RightSelect onClick={handleClickSelectTask}>
          {openSelectTask ? <ExpandLess /> : <ExpandMore />}
        </RightSelect>
      </ViewSelect>
      <Collapse in={openSelectTask} timeout="auto" unmountOnExit>
        <Table aria-label="simple table" sx={{ border: 0 }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  border: "1px solid #ccc",
                  background: "#e9e9e9",
                  textAlign: "center",
                },
              }}
            >
              <TableCell scope="row">Huỷ bỏ</TableCell>
              <TableCell scope="row">Công việc</TableCell>
              <TableCell scope="row">Loại công việc</TableCell>
              <TableCell scope="row">Deadline</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& td": { border: "1px solid #ccc" },
                  }}
                >
                  <TableCell scope="row">
                    <ClearIcon
                      sx={{ marginLeft: "18px" }}
                      onClick={() => handlePushTask(task)}
                    />
                  </TableCell>
                  <TableCell scope="row">
                    <TextView>{task.name}</TextView>
                  </TableCell>
                  <TableCell scope="row">
                    {task.type === 0 ? (
                      <TextView>Công việc chung</TextView>
                    ) : (
                      <TextView>Công việc khác</TextView>
                    )}
                  </TableCell>
                  <TableCell scope="row">
                    <FormList>
                      <TextField
                        style={{ width: "50%" }}
                        type="date"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          dispatch(
                            updateBillable({
                              ...task,
                              timeStartTask: event.target.value,
                            })
                          );
                        }}
                      />
                      <p style={{ padding: "0 5px" }}>to</p>
                      <TextField
                        style={{ width: "50%" }}
                        type="date"
                        onChange={(
                          event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          dispatch(
                            updateBillable({
                              ...task,
                              timeEndTask: event.target.value,
                            })
                          );
                        }}
                      />
                    </FormList>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        ;
      </Collapse>
    </Wrapper>
  );
};

export default Tasks;
