import React, { useEffect, useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import styled from "styled-components";
import { useSnackbar } from "notistack";
import { RootState } from "../../../redux/store";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { IGetAllReq } from "../../../interfaces/user/userType";
import { updateUserActions } from "../../../redux/actions/user";
import {
  resetUpdateProgress,
  resetUserProgress,
} from "../../../redux/reducer/userRuducer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseIcon from "@mui/icons-material/Close";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TitleHeader = styled.div`
  font-size: 22px;
`;

const FormLeft = styled.div`
  width: 45%;
`;

const FormRight = styled.div`
  width: 45%;
`;

const FormCreate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BtnUpdateUser = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

interface IUpdateUser {
  id: number;
  userName: string;
  password: string;
  emailAddress: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  roleNames: string;
  avatarPath: string;
  type: string;
  branch: string;
  sex: string;
}

export const EditUser: React.FC<{ user: IGetAllReq }> = ({ user }) => {
  const dispatch = useDispatch();

  const { control, handleSubmit } = useForm<IUpdateUser>({
    defaultValues: {
      id: user.id,
      userName: user.userName,
      password: user.password,
      emailAddress: user.emailAddress,
      name: user.name,
      surname: user.surname,
      address: user.address,
      phoneNumber: user.phoneNumber,
      roleNames: user.roleNames,
      avatarPath: user.avatarPath,
      type: user.type.toString(),
      branch: user.branch.toString(),
      sex: user.sex.toString(),
    },
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const progress = useSelector((state: RootState) => state.user.progress);
  const message = useSelector((state: RootState) => state.user.error.message);

  const handleEdit = (props: IUpdateUser) => {
    dispatch(
      updateUserActions({
        id: props.id,
        userName: props.userName,
        password: props.password,
        emailAddress: props.emailAddress,
        name: props.name,
        surname: props.surname,
        address: props.address,
        phoneNumber: props.phoneNumber,
        roleNames: props.roleNames,
        avatarPath: props.avatarPath,
        type: +props.type,
        branch: +props.branch,
        sex: +props.sex,
      })
    );
  };

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar("Sửa vai trò thành công", { variant: "success" });
      dispatch(resetUserProgress());
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
        <p>Chỉnh sửa</p>
      </MenuItem>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 400,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(handleEdit)}>
            <Header>
              <TitleHeader>Chỉnh sửa người dùng</TitleHeader>
              <CloseIcon onClick={handleClose} />
            </Header>
            <hr />
            <FormCreate>
              <FormLeft>
                <Controller
                  name="userName"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập username"
                        sx={{
                          border: "1px solid #dfa3a31e",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="name"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập tên"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="avatarPath"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập avatar"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="branch"
                  render={({ field }) => {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& div": { padding: "8px 0" },
                        }}
                        {...field}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>58K1</MenuItem>
                        <MenuItem value={2}>58K2</MenuItem>
                        <MenuItem value={3}>58K3</MenuItem>
                        <MenuItem value={4}>58K4</MenuItem>
                        <MenuItem value={5}>59K1</MenuItem>
                        <MenuItem value={6}>59K2</MenuItem>
                        <MenuItem value={7}>59K3</MenuItem>
                        <MenuItem value={8}>59K4</MenuItem>
                        <MenuItem value={9}>60K1</MenuItem>
                        <MenuItem value={10}>60K2</MenuItem>
                        <MenuItem value={11}>60K3</MenuItem>
                        <MenuItem value={12}>60K4</MenuItem>
                        <MenuItem value={13}>61K1</MenuItem>
                        <MenuItem value={14}>61K2</MenuItem>
                        <MenuItem value={15}>61K3</MenuItem>
                        <MenuItem value={16}>61K4</MenuItem>
                      </Select>
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="sex"
                  render={({ field }) => {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        {...field}
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& div": { padding: "8px 0" },
                        }}
                      >
                        <MenuItem value={0}>Nam</MenuItem>
                        <MenuItem value={1}>Nữ</MenuItem>
                      </Select>
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              </FormLeft>
              <FormRight>
                <Controller
                  name="emailAddress"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập email"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="address"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập địa chỉ"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="surname"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập họ"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="phoneNumber"
                  render={({ field }) => {
                    return (
                      <TextField
                        hiddenLabel
                        id="standard-basic"
                        variant="standard"
                        {...field}
                        placeholder="Mời nhập SĐT"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& input": { padding: "10px" },
                        }}
                      />
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
                <Controller
                  name="type"
                  render={({ field }) => {
                    return (
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          border: "1px solid rgba(0,0,0,.12)",
                          width: "100%",
                          marginBottom: "20px",
                          "& div": { padding: "8px 0" },
                        }}
                        {...field}
                      >
                        <MenuItem value={0}>None</MenuItem>
                        <MenuItem value={1}>Leader</MenuItem>
                        <MenuItem value={2}>Member</MenuItem>
                        <MenuItem value={3}>Manager</MenuItem>
                      </Select>
                    );
                  }}
                  control={control}
                  defaultValue=""
                />
              </FormRight>
            </FormCreate>
            <BtnUpdateUser>
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
            </BtnUpdateUser>
          </form>
        </Box>
      </Modal>
    </>
  );
};
