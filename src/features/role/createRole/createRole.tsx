import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { RootState } from "../../../redux/store";
import { IRoleReq } from "../../../interfaces/role/roleType";
import { createRoleActions } from "../../../redux/actions/role";
import {
  resetCreateProgress,
  resetMessage,
  resetProgress,
} from "../../../redux/reducer/roleReducer";
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

interface INewRole {
  name: string;
  displayName: string;
  description: string;
}

const CreateRole: React.FC = () => {
  const { reset, control, handleSubmit } = useForm<INewRole>();
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.role.progress);
  const createProgress = useSelector(
    (state: RootState) => state.role.createProgress
  );
  const message = useSelector((state: RootState) => state.role.error.message);
  const handleCreate = (props: IRoleReq) => {
    dispatch(
      createRoleActions({
        name: props.name,
        displayName: props.displayName,
        description: props.description,
      })
    );
    reset({
      name: "",
      displayName: "",
      description: "",
    });
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (createProgress === "done") {
      enqueueSnackbar("Create Role SuccessFully", { variant: "success" });
      dispatch(resetMessage());
      dispatch(resetProgress());
      dispatch(resetCreateProgress());
      setOpen(false);
    } else if (createProgress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, , createProgress, open, dispatch]);
  return (
    <NewTask>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create Role
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
            <TitleHeader>New Role</TitleHeader>
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
              name="displayName"
              render={({ field }) => {
                return (
                  <InputName
                    label="Display Name *"
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
              name="description"
              render={({ field }) => {
                return (
                  <InputName
                    label="Description *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%" }}
                  />
                );
              }}
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

export default CreateRole;
