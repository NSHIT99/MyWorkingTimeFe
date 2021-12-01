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

import { useSnackbar } from "notistack";
import { ICreateUserReq } from "../../../interfaces/user/userType";
import { createUserActions } from "../../../redux/actions/user";
import {
  resetMessage,
  resetUserProgress,
} from "../../../redux/reducer/userRuducer";
import TabUser from "./tabUser/tabUser";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TabRole from "./tabRole/tabRole";
import { getAllRoleActions } from "../../../redux/actions/role";

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
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ListTab = styled.div`
  overflow-y: auto;
  width: 100%;
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
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface INewUser {
  userName: string;
  password: string;
  emailAddress: string;
  name: string;
  surname: string;
  address: string;
  phoneNumber: string;
  roleNames: string | null;
  avatarPath: string;
  type: string;
  branch: string;
  sex: string;
}

const CreateUser: React.FC = () => {
  const { reset, control, handleSubmit, register, setValue } =
    useForm<INewUser>();
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.user.progress);
  const message = useSelector((state: RootState) => state.user.error.message);
  const handleCreate = (props: ICreateUserReq) => {
    dispatch(
      createUserActions({
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
    reset();
  };

  const [valueTab, setValueTab] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (progress === "done" && open) {
      enqueueSnackbar("Create Role SuccessFully", { variant: "success" });
      dispatch(resetMessage());
      dispatch(resetUserProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, open, dispatch]);

  useEffect(() => {
    dispatch(getAllRoleActions());
  }, []);
  return (
    <NewTask>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Create User
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            height: "78%",
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(handleCreate)}>
            <Header>
              <TitleHeader>Create User</TitleHeader>
              <CloseIcon onClick={handleClose} />
            </Header>
            <hr />
            <Box sx={{ width: "100%", zIndex: 0 }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={valueTab}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="User"
                    {...a11yProps(0)}
                    sx={{ textTransform: "capitalize" }}
                  />
                  <Tab
                    label="Role"
                    {...a11yProps(1)}
                    sx={{ textTransform: "capitalize" }}
                  />
                </Tabs>
              </Box>
              <ListTab>
                <TabPanel value={valueTab} index={0}>
                  <TabUser register={register} setValue={setValue} />
                </TabPanel>
                <TabPanel value={valueTab} index={1}>
                  <TabRole register={register} setValue={setValue} />
                </TabPanel>
              </ListTab>
            </Box>
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

export default CreateUser;
