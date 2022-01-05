import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { getTask } from "../../../../redux/actions/task";
import General from "./tabCreateProject/general/general";
import Tasks from "./tabCreateProject/tasks/tasks";
import Team from "./tabCreateProject/team/team";
import { useForm } from "react-hook-form";
import { RootState } from "../../../../redux/store";
import Tab from "@mui/material/Tab";
import { resetProgress } from "../../../../redux/reducer/projectReducer";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { Alert, Snackbar } from "@mui/material";
import { createProject } from "../../../../redux/actions/project";

const TitleHeader = styled.div`
  font-size: 30px;
  font-weight: bold;
  line-height: 48px;
  z-index: 1;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NewProject = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const BtnNewProject = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const ListTab = styled.div`
  overflow-y: auto;
  width: 100%;
  height: 450px;
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

export interface INewProject {
  code: string;
  isAllUserBelongTo: boolean;
  name: string;
  note: string;
  projectTargetUsers: {
    userId: number;
    roleName: string;
    id: number;
  }[];
  projectType: number;
  status: number;
  tasks: { taskId: number; billable?: boolean; id: number }[];
  timeEnd: string;
  timeStart: string;
  users: { userId: number; type?: number; id: number }[];
}

const CreateProjects: React.FC = () => {
  const dispatch = useDispatch();
  const { reset, register, handleSubmit, setValue } = useForm<INewProject>();

  const [open, setOpen] = React.useState(false);
  const progress = useSelector((state: RootState) => state.project.progress);
  const selectedMembers = useSelector(
    (state: RootState) => state.project.selectedMembers
  );
  const selectedTasks = useSelector(
    (state: RootState) => state.project.viewTask
  );
  const handleOpen = () => {
    setOpen(true);
    dispatch(getTask());
  };
  const handleClose = () => {
    setOpen(false);
    reset({
      name: "",
      code: "",
      status: 0,
      timeStart: "",
      timeEnd: "",
      note: "",
      projectType: 0,
      tasks: [],
      users: [],
      projectTargetUsers: [],
      isAllUserBelongTo: false,
    });
  };
  const [valueTab, setValueTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValueTab: number) => {
    setValueTab(newValueTab);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpen(false);
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const onSaveProject = (props: INewProject) => {
    let members: { userId: number; id: number; type?: number }[] = [];
    selectedMembers.forEach((member) =>
      members.push({
        id: 0,
        userId: member.id,
        type:
          typeof member.projectType === "undefined" ? 1 : member.projectType,
      })
    );
    let tasks: { id: number; taskId: number; billable?: boolean }[] = [];
    selectedTasks.forEach((task) => {
      tasks.push({ taskId: task.id, id: 0, billable: task.billable || false });
    });
    const newProject: INewProject = {
      name: props.name,
      code: props.code,
      status: props.status,
      timeStart: props.timeStart,
      timeEnd: props.timeEnd,
      note: props.note,
      projectType: props.projectType || 1,
      tasks: tasks,
      users: members,
      projectTargetUsers: props.projectTargetUsers,
      isAllUserBelongTo: props.isAllUserBelongTo,
    };
    dispatch(createProject(newProject));
    reset({
      name: "",
      code: "",
      status: 0,
      timeStart: "",
      timeEnd: "",
      note: "",
      projectType: 0,
      tasks: [],
      users: [],
      projectTargetUsers: [],
      isAllUserBelongTo: false,
    });
  };
  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
      handleOpenSnackbar();
    }
  }, [progress, open, dispatch]);

  return (
    <NewProject>
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
      >
        <Alert
          variant="filled"
          severity="success"
          onClose={handleSnackbarClose}
        >
          Create Project Success
        </Alert>
      </Snackbar>
      <Button
        style={{
          background: "#f24b50",
          height: "40px",
          fontSize: "12px",
          width: "150px",
        }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Tạo dự án
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70%",
            height: "85%",
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(onSaveProject)}>
            <Header>
              <TitleHeader>Tạo dự án</TitleHeader>
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
                    label="General"
                    {...a11yProps(0)}
                    sx={{ textTransform: "capitalize" }}
                  />
                  <Tab
                    label="Team"
                    {...a11yProps(1)}
                    sx={{ textTransform: "capitalize" }}
                  />
                  <Tab
                    label="Tasks"
                    {...a11yProps(2)}
                    sx={{ textTransform: "capitalize" }}
                  />
                </Tabs>
              </Box>
              <ListTab>
                <TabPanel value={valueTab} index={0}>
                  <General register={register} setValue={setValue} />
                </TabPanel>
                <TabPanel value={valueTab} index={1}>
                  <Team />
                </TabPanel>
                <TabPanel value={valueTab} index={2}>
                  <Tasks />
                </TabPanel>
              </ListTab>
            </Box>
            <BtnNewProject>
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
            </BtnNewProject>
          </form>
        </Box>
      </Modal>
    </NewProject>
  );
};

export default CreateProjects;
