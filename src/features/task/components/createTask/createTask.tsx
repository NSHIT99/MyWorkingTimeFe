import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "../../../../redux/store";
import { resetCreateProgress, resetProgress } from "../../../../redux/reducer/taskReducer";
import { NativeSelect } from "@mui/material";
import { createTask } from "../../../../redux/actions/task";
import { ICreateTaskReq } from "../../../../interfaces/task/taskType";
import { useSnackbar } from "notistack";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const NewTask = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const BtnNewTask = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const InputName = styled(TextField)``;

interface INewTask {
  name: string;
  type: string;
}

const CreateTasks: React.FC = () => {
  const { reset, control, handleSubmit } = useForm<INewTask>();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const progress = useSelector((state: RootState) => state.task.progress);
  const createProgress = useSelector((state: RootState) => state.task.createProgress);
  const message = useSelector((state: RootState) => state.task.error.message);
  const handleCreate = async (props: ICreateTaskReq) => {
    dispatch(
      createTask({
        name: props.name,
        type: +props.type,
      })
    );
    reset({
      name: "",
      type: "",
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (createProgress === "done" && open) {
      enqueueSnackbar("Create Task SuccessFully", { variant: "success" });
      dispatch(resetProgress());
      dispatch(resetCreateProgress());
      setOpen(false);
    } else if (createProgress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [createProgress, open, dispatch]);
  return (
    <NewTask>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Tạo công việc
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
          <form onSubmit={handleSubmit(handleCreate)}>
            <TitleHeader>New Task</TitleHeader>
            <Controller
              name="name"
              render={({ field }) => {
                return (
                  <InputName
                    label="Name *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%" }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <Controller
              name="type"
              render={({ field }) => (
                <NativeSelect {...field} style={{ width: "100%" }}>
                  <option value={0}>Common Task</option>
                  <option value={1}>Other Task</option>
                </NativeSelect>
              )}
              control={control}
              defaultValue=""
            />
            <BtnNewTask>
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
            </BtnNewTask>
          </form>
        </Box>
      </Modal>
    </NewTask>
  );
};

export default CreateTasks;
