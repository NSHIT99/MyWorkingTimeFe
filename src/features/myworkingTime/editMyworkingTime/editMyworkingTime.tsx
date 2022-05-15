import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { NativeSelect } from "@mui/material";
import { useSnackbar } from "notistack";
import { IWorking } from "../../../interfaces/myworkingtime/myworkingtime";
import { RootState } from "../../../redux/store";
import {
  getProjectsInTasksActions,
  updateMyWorkingtimeActions,
} from "../../../redux/actions/myworkingtime";
import { resetProgress } from "../../../redux/reducer/myworkingtimeReducer";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const TitleHeader = styled.div`
  font-size: 22px;
`;
const NewWorkingtime = styled.div`
  display: flex;
  padding: 10px 10px;
  gap: 250px;
`;

const BtnNewWorkingtime = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const InputName = styled(TextField)``;

interface INewWorkingtime {
  projectTaskId: string;
  note: string;
  workingTime: string;
  status: string;
  typeOfWork: string;
  createdAt: string;
  dateAt: string;
  userId: number;
  id: number;
  updatedAt: string;
}

const EditWorkingtimes: React.FC<{ workingtime: IWorking }> = ({
  workingtime,
}) => {
  let changeTask = false;
  const [projectTask, setProjectTask] = useState("0");

  const projectsintasks = useSelector(
    (state: RootState) => state.myworkingtime.projectsintasks
  );
  useEffect(() => {
    dispatch(getProjectsInTasksActions());
  }, []);

  const handleChangeProjectTask = (event: SelectChangeEvent) => {
    changeTask = false;
    setProjectTask(event.target.value as string);
  };

  const projectsintasksFilter = projectsintasks[parseInt(projectTask)];

  const { reset, control, handleSubmit } = useForm<INewWorkingtime>({
    defaultValues: {
      projectTaskId: workingtime.projectTaskId.toString(),
      note: workingtime.note,
      workingTime: workingtime.workingTime.toString(),
      status: workingtime.status.toString(),
      typeOfWork: workingtime.typeOfWork.toString(),
      createdAt: workingtime.createdAt,
      dateAt: workingtime.dateAt,
      userId: workingtime.userId,
      id: workingtime.id,
      updatedAt: workingtime.updatedAt,
    },
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const message = useSelector(
    (state: RootState) => state.myworkingtime.error.message
  );
  const progress = useSelector(
    (state: RootState) => state.myworkingtime.progress
  );
  const handleEdit = async (props: INewWorkingtime) => {
    dispatch(
      updateMyWorkingtimeActions({
        projectTaskId: +props.projectTaskId,
        note: props.note,
        workingTime: +props.workingTime,
        status: +props.status,
        typeOfWork: +props.typeOfWork,
        createdAt: props.createdAt,
        dateAt: props.dateAt,
        userId: props.userId,
        id: props.id,
        updatedAt: props.updatedAt,
      })
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    reset({
      projectTaskId: workingtime.projectTaskId.toString(),
      note: workingtime.note,
      workingTime: workingtime.workingTime.toString(),
      status: workingtime.status.toString(),
      typeOfWork: workingtime.typeOfWork.toString(),
      createdAt: workingtime.createdAt,
      dateAt: workingtime.dateAt,
      userId: workingtime.userId,
      id: workingtime.id,
      updatedAt: workingtime.updatedAt,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar("Sửa thời gian làm việc thành công", {
        variant: "success",
      });
      dispatch(resetProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, open, dispatch]);

  return (
    <NewWorkingtime>
      <Button
        style={{ background: "#fff", height: "40px", color: "#000" }}
        variant="contained"
        onClick={handleOpen}
      >
        Sửa
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(handleEdit)}>
            <TitleHeader>Sửa công việc</TitleHeader>
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
            <Controller
              name="projectTaskId"
              render={({ field }) => (
                <NativeSelect
                  {...field}
                  style={{ width: "100%" }}
                  onChange={() => (changeTask = true)}
                >
                  {projectsintasksFilter.tasks.map((task) => {
                    return (
                      <option value={task.projectTaskId}>
                        {task.taskName}
                      </option>
                    );
                  })}
                </NativeSelect>
              )}
              control={control}
              defaultValue={
                projectsintasksFilter?.tasks[projectTask as any]
                  .projectTaskId as any
              }
            />
            <Controller
              name="note"
              render={({ field }) => {
                return (
                  <InputName
                    label="Note *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <Controller
              name="workingTime"
              render={({ field }) => {
                return (
                  <InputName
                    label="Thời gian làm việc *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <Controller
              name="typeOfWork"
              render={({ field }) => (
                <NativeSelect {...field} style={{ width: "100%" }}>
                  <option value={0}>Thời gian quy định</option>
                  <option value={1}>Làm việc thêm</option>
                </NativeSelect>
              )}
              control={control}
              defaultValue=""
            />
            <BtnNewWorkingtime>
              <Button
                variant="outlined"
                color="error"
                sx={{ color: "#333333" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ background: "#f24b50", color: "#333333" }}
              >
                Save
              </Button>
            </BtnNewWorkingtime>
          </form>
        </Box>
      </Modal>
    </NewWorkingtime>
  );
};

export default EditWorkingtimes;
