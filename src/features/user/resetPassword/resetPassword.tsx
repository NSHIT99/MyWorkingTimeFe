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
import { IGetAllReq, IResetPassword } from "../../../interfaces/user/userType";
import { RootState } from "../../../redux/store";
import { resetUserProgress } from "../../../redux/reducer/userRuducer";
import { resetPasswordActions } from "../../../redux/actions/user";
import { MenuItem } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const BtnNewTask = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const TitleActions = styled.p`
  margin: 0;
`;

const InputName = styled(TextField)``;

interface IResetPass {
  userId: number;
  adminPassword: string;
  newPassword: string;
}

const ResetPassword: React.FC<{ user: IGetAllReq }> = ({ user }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { reset, control, handleSubmit } = useForm<IResetPassword>({
    defaultValues: {
      userId: user.id,
      adminPassword: user.password,
      newPassword: user.password,
    },
  });

  const message = useSelector((state: RootState) => state.user.error.message);
  const progress = useSelector((state: RootState) => state.user.progress);
  const handleEdit = async (props: IResetPass) => {
    dispatch(
      resetPasswordActions({
        userId: props.userId,
        adminPassword: props.adminPassword,
        newPassword: props.newPassword,
      })
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    reset({
      userId: user.id,
      adminPassword: user.password,
      newPassword: user.password,
    });
    setOpen(true);
  };

  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar("Thay ?????i m???t kh???u th??nh c??ng", { variant: "success" });
      dispatch(resetUserProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, open, dispatch]);

  return (
    <>
      <MenuItem disableRipple onClick={handleOpen}>
        <LockIcon />
        <TitleActions>?????i m???t kh???u</TitleActions>
      </MenuItem>
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
            <TitleHeader>Thay ?????i m???t kh???u</TitleHeader>
            <Controller
              name="adminPassword"
              render={({ field }) => {
                return (
                  <InputName
                    label="M???t kh???u Admin *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                );
              }}
              control={control}
              defaultValue="a"
            />
            <Controller
              name="newPassword"
              render={({ field }) => {
                return (
                  <InputName
                    label="M???t kh???u m???i *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                );
              }}
              control={control}
              defaultValue="a"
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
    </>
  );
};

export default ResetPassword;
