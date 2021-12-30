import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { NativeSelect } from "@mui/material";
import { createTask } from "../../../../redux/actions/task";
import { RootState } from "../../../../redux/store";
import { resetProgress } from "../../../../redux/reducer/taskReducer";
import { ITaskReq } from "../../../../interfaces/task/taskType";
import { useSnackbar } from "notistack";

const TitleHeader = styled.div`
  font-size: 22px;
`;
const NewTask = styled.div`
  display: flex;
  padding: 10px 10px;
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
  id: number;
  name: string;
  type: string;
}

const EditTasks: React.FC<{ task: ITaskReq }> = ({ task }) => {
  const { reset, control, handleSubmit } = useForm<INewTask>({
    defaultValues: { id: task.id, name: task.name, type: task.type.toString() },
  });
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const message = useSelector((state: RootState) => state.task.error.message);
  const progress = useSelector((state: RootState) => state.task.progress);
  const handleEdit = async (props: INewTask) => {
    dispatch(
      createTask({
        id: props.id,
        name: props.name,
        type: +props.type,
      })
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    reset({
      id: task.id,
      name: task.name,
      type: task.type.toString() as string,
    });
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar("Sửa công việc thành công", { variant: "success" });
      dispatch(resetProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, open, dispatch]);

  return (
    <NewTask>
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
            <Controller
              name="name"
              render={({ field }) => {
                return (
                  <InputName
                    label="Name *"
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
              name="type"
              render={({ field }) => (
                <NativeSelect {...field} style={{ width: "100%" }}>
                  <option value={0}>Công việc chung</option>
                  <option value={1}>Công việc khác</option>
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

export default EditTasks;
