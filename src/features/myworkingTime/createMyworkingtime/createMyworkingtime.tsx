import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { NativeSelect } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import {
  createMyworkingTimeActions,
  getProjectsInTasksActions,
} from "../../../redux/actions/myworkingtime";
import { RootState } from "../../../redux/store";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  resetCreateMyworkingTimeProgress,
  resetProgress,
} from "../../../redux/reducer/myworkingtimeReducer";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const NewMyworkingtime = styled.div`
  display: flex;
  gap: 250px;
`;

const BtnNewMyworkingtime = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const InputName = styled(TextField)``;

interface INewMyworkingtime {
  status: number;
  projectTaskId: number;
  note: string;
  workingTime: number;
  typeOfWork: number;
  dateAt: string;
}

export interface IDateValue {
  value: Date | null;
}

const CreateMyworkingtime: React.FC<IDateValue> = ({ value }) => {
  const { reset, control, handleSubmit } = useForm<any>();
  const [open, setOpen] = React.useState(false);
  let changeTask = false;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
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
  const handleCreate = async (props: INewMyworkingtime) => {
    if (!changeTask)
      props.projectTaskId = projectsintasksFilter?.tasks[0].projectTaskId;
    if (value) {
      let dateAt = new Date(value);
      dispatch(
        createMyworkingTimeActions({
          projectTaskId: +props.projectTaskId,
          note: props.note,
          workingTime: +props.workingTime,
          status: +props.status,
          typeOfWork: +props.typeOfWork,
          dateAt: `${dateAt}`,
        })
      );
      reset({
        projectTaskId: "",
        note: "",
        workingTime: "",
        status: "",
        typeOfWork: "",
        dateAt: "",
      });
    }
  };

  const createMyworkingTimeProgress = useSelector(
    (state: RootState) => state.myworkingtime.createMyworkingTimeProgress
  );
  useEffect(() => {
    if (createMyworkingTimeProgress === "done" && open) {
      enqueueSnackbar("Tạo công việc thành công", { variant: "success" });
      dispatch(resetProgress());
      dispatch(resetCreateMyworkingTimeProgress());
      setOpen(false);
    } else if (createMyworkingTimeProgress === "error") {
      enqueueSnackbar("Tạo thời gian làm việc thành công", {
        variant: "error",
      });
    }
  }, [createMyworkingTimeProgress, open, dispatch]);
  return (
    <NewMyworkingtime>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Tạo mới
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(handleCreate)}>
            <TitleHeader>Tạo thời gian làm việc</TitleHeader>
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
              defaultValue={projectsintasksFilter?.tasks[0].projectTaskId}
            />
            <Controller
              name="note"
              render={({ field }) => {
                return (
                  <InputName
                    label="Ghi chú *"
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
            <BtnNewMyworkingtime>
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
            </BtnNewMyworkingtime>
          </form>
        </Box>
      </Modal>
    </NewMyworkingtime>
  );
};

export default CreateMyworkingtime;
