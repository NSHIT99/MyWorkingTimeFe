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
import {
  pushTask,
  removeTask,
  updateBillable,
} from "../../../../../../redux/reducer/projectReducer";
import { ITaskReq } from "../../../../../../interfaces/task/taskType";

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

const Tasks: React.FC = () => {
  const dispatch = useDispatch();

  const [openSelectTask, setOpenSelectTask] = React.useState(true);
  const handleClickSelectTask = () => {
    setOpenSelectTask(!openSelectTask);
  };
  const Tasks = useSelector((state: RootState) => state.project.viewTask);
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
        <NavHeader>
          <Text>Công việc</Text>
          <RightNav>
            <Text>Tích chọn</Text>
            <Checkbox {...label} color="error" defaultChecked />
          </RightNav>
        </NavHeader>
        {selectedTasks.map((task) => {
          return (
            <ViewHeader>
              <LeftViewHeader>
                <ClearIcon onClick={() => handleRemoveTask(task)} />
                <TextView>{task.name}</TextView>
              </LeftViewHeader>
              <RightViewHeader>
                <Checkbox
                  color="error"
                  value={check}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCheck(event.target.checked);
                    dispatch(
                      updateBillable({
                        ...task,
                        billable: event.target.checked,
                      })
                    );
                  }}
                />
              </RightViewHeader>
            </ViewHeader>
          );
        })}
      </Header>
      <ViewSelect>
        <TextView>Danh sách công việc</TextView>
        <RightSelect onClick={handleClickSelectTask}>
          {openSelectTask ? <ExpandLess /> : <ExpandMore />}
        </RightSelect>
      </ViewSelect>
      <Collapse in={openSelectTask} timeout="auto" unmountOnExit>
        {Tasks.map((item) => {
          return (
            <ViewTask>
              <LeftView>
                <AddCircleOutlineIcon
                  sx={{ marginLeft: "18px" }}
                  onClick={() => handlePushTask(item)}
                />
                <TextView>{item.name}</TextView>
              </LeftView>
              <RightView>
                {item.type === 0 ? (
                  <TextView>Công việc chung</TextView>
                ) : (
                  <TextView>Công việc khác</TextView>
                )}
              </RightView>
            </ViewTask>
          );
        })}
      </Collapse>
    </Wrapper>
  );
};

export default Tasks;
