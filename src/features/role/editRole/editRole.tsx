import React, { useEffect, useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { RootState } from "../../../redux/store";
import { resetProgress, resetUpdateProgress } from "../../../redux/reducer/roleReducer";
import { IRoleReq } from "../../../interfaces/role/roleType";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { updateRoleActions } from "../../../redux/actions/role";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const InputName = styled(TextField)``;

const BtnEditRole = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const TitleActions = styled.p`
  margin: 0;
`;

interface IUpdateRole {
  id: number;
  name: string;
  displayName: string;
  description: string;
}

export const EditRole: React.FC<{ role: IRoleReq }> = ({ role }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm<IUpdateRole>({
    defaultValues: { id: role.id, name: role.name, displayName: role.displayName, description: role.description },
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const progress = useSelector((state: RootState) => state.role.progress);
  const message = useSelector((state: RootState) => state.role.error.message);

  const handleEdit = (props: IUpdateRole) => {
    dispatch(
      updateRoleActions({
        id: props.id,
        name: props.name,
        displayName: props.displayName,
        description: props.description,
      })
    );
  };

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar("Sửa vai trò thành công", { variant: "success" });
      dispatch(resetProgress());
      dispatch(resetUpdateProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, open, dispatch]);
  return (
    <>
      <MenuItem disableRipple onClick={handleOpen}>
        <EditIcon />
        <TitleActions>Chỉnh sửa</TitleActions>
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
            <TitleHeader>Sửa vai trò</TitleHeader>
            <Controller
              name="name"
              render={({ field }) => {
                return (
                  <InputName
                    label="Vai trò *"
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
                    label="Tên hiển thi *"
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
                    label="Đặc điểm *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%" }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <BtnEditRole>
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
            </BtnEditRole>
          </form>
        </Box>
      </Modal>
    </>
  );
};
