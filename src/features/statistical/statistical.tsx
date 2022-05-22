import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PieChart, { Series, Label, Legend } from "devextreme-react/pie-chart";
import { getProjectsInTasksActions } from "../../redux/actions/myworkingtime";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import ListStatistical from "./listStatistical/listStatistical";

const Statistical: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectsInTasksActions());
  }, []);

  const projectsintasks = useSelector(
    (state: RootState) => state.myworkingtime.projectsintasks
  );
  const [projectTask, setProjectTask] = useState("0");
  let confirm: any = [];
  const projectsintasksFilter = projectsintasks[parseInt(projectTask)];
  projectsintasksFilter.tasks.map((task) => {
    confirm.push(task.confirm);
  });

  const handleChangeProjectTask = (event: SelectChangeEvent) => {
    setProjectTask(event.target.value as string);
  };

  return (
    <div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={projectTask}
        onChange={handleChangeProjectTask}
        sx={{
          border: "1px solid rgba(0,0,0,.12)",
          width: "100%",
          marginBottom: "20px",
          "& div": { padding: "8px 0" },
        }}
      >
        {projectsintasks.map((item, index) => {
          return (
            <MenuItem value={index}>
              {" "}
              {item.projectName}({item.listPM.join("-")})
            </MenuItem>
          );
        })}
      </Select>
      <ListStatistical confirm={confirm}/>
    </div>
  );
};

export default Statistical;
