import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import { useSnackbar } from "notistack";
import Tab from "@mui/material/Tab";
import CloseIcon from "@mui/icons-material/Close";
import { IGetAllReq } from "../../../interfaces/user/userType";
import { RootState } from "../../../redux/store";
import { updateUserActions } from "../../../redux/actions/user";
import {
  resetUpdateProgress,
  resetUserProgress,
} from "../../../redux/reducer/userRuducer";
import EditIcon from "@mui/icons-material/Edit";
import { MenuItem } from "@mui/material";
import { TabContext, TabList } from "@mui/lab";
import TabEditRole from "./tabEditRole/tabEditRole";
import { TabEditUser } from "./tabEditUser/tabEditUser";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const BtnNewTask = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentForm = styled(Box)`
  margin-top: 40px;
  width: 100%;
  margin-bottom: 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  z-index: 0;
`;

const TabTitle = styled(Tab)`
  font-size: 10px;
  font-weight: 700;
  padding: 10px;
  width: 180px;
`;

const TitleActions = styled.p`
  margin: 0;
`;

export interface IUpdateUser {
  id: number;
  userName: string;
  password: string;
  emailAddress: string;
  name: string;
  surname: string;
  fullName: string;
  address: string;
  phoneNumber: string;
  roleNames: string;
  avatarPath: string;
  type: string;
  branch: string;
  sex: string;
}

const EditUser: React.FC<{ user: IGetAllReq }> = ({ user }) => {
  const dispatch = useDispatch();
  const [valueTab, setValueTab] = React.useState("1");

  const { control, handleSubmit, setValue } = useForm<IUpdateUser>({
    defaultValues: {
      id: user.id,
      userName: user.userName,
      password: user.password,
      emailAddress: user.emailAddress,
      name: user.name,
      surname: user.surname,
      fullName: user.fullName,
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
        fullName: props.fullName,
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

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  return (
    <>
      <MenuItem disableRipple onClick={handleOpen}>
        <EditIcon />
        <TitleActions>Chỉnh sửa</TitleActions>
      </MenuItem>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "85%",
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
            <ContentForm
              sx={{
                typography: "body1",
              }}
            >
              <TabContext value={valueTab}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <TabTitle label="user" value="1" />
                    <TabTitle label="role" value="2" />
                  </TabList>
                </Box>
                <TabEditUser control={control} setValue={setValue} />
                <TabEditRole control={control} setValue={setValue} />
              </TabContext>
            </ContentForm>
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

export default EditUser;
