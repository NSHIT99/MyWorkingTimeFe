import { Button, MenuItem, Modal, Tab } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList } from "@mui/lab";
import { RootState } from "../../../../redux/store";
import { useForm } from "react-hook-form";
import { resetProgress } from "../../../../redux/reducer/projectReducer";
import EditIcon from "@mui/icons-material/Edit";
import General from "./tabEdit/general/general";
import Team from "./tabEdit/team/team";
import Tasks from "./tabEdit/tasks/tasks";
import { IEditProject, IProjectReq } from "../../../../interfaces/project/projectType";

const Container = styled(Box)`
  display: block;
  padding: 24px;
  margin-left: 15%;
  border-radius: 10px;
  box-sizing: border-box;
  outline: 0;
  width: 70%;
  height: 100vh;
  outline: 0;
  background: #fff;
  color: rgba(0, 0, 0, 0.87);
  z-index: 0;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const HeaderForm = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  z-index: 9999;
`;
const ContentForm = styled(Box)`
  margin-top: 40px;
  width: 100%;
  height: 500px;
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
const FooterForm = styled.div`
  height: 50px;
  display: flex;
  padding-top: 30px;
  flex-direction: row;
  justify-content: end;
  border-top: 1px solid lightgray;
  margin-right: 20px;
  z-index: 9999;
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 25px;
  font-weight: 600;
`;

const TabTitle = styled(Tab)`
  font-size: 10px;
  font-weight: 700;
  padding: 10px;
  width: 180px;
`;
const EditProject: React.FC<{ project: IProjectReq }> = ({ project }) => {
  const [open, setOpen] = React.useState(false);
  const [valueTab, setValueTab] = React.useState("1");
  const dispatch = useDispatch();
  const projectGet = useSelector((state: RootState) => state.project.project);
  const userProjectGetArray = projectGet.users;
  const taskProjectGetArray = projectGet.tasks;
  const filteredUsers = useSelector(
    (state: RootState) => state.project.filteredUsers
  );
  const viewTasks = useSelector((state: RootState) => state.project.viewTask);
  let selectedMembers = useSelector(
    (state: RootState) => state.project.selectedMembers
  );

  let selectedTasks = useSelector(
    (state: RootState) => state.project.selectedTasks
  );
  const progress = useSelector((state: RootState) => state.project.progress);
  //member
  const idUsers = userProjectGetArray.map((e) => e.userId);
  selectedMembers = filteredUsers.filter((e) => idUsers.includes(e.id));
  const userValue = selectedMembers.map((e) => e.id);
  const viewNewUser = filteredUsers.filter((e) => !userValue.includes(e.id));
  //task
  const idTasks = taskProjectGetArray.map((e) => e.taskId);
  selectedTasks = viewTasks.filter((e) => idTasks.includes(e.id));
  const taskValue = selectedTasks.map((e) => e.id);
  const viewNewTask = viewTasks.filter((e) => !taskValue.includes(e.id));

  const defaultValues = {
    name: projectGet.name,
    code: projectGet.code,
    status: projectGet.status,
    timeStart: projectGet.timeStart,
    timeEnd: projectGet.timeEnd,
    note: projectGet.note,
    projectType: projectGet.projectType,
    tasks: selectedTasks,
    users: selectedMembers,
    projectTargetUsers: projectGet.projectTargetUsers,
    isAllUserBelongTo: projectGet.isAllUserBelongTo,
  };
  const methods = useForm<IEditProject>({
    defaultValues: defaultValues,
  });
  const { control, setValue, reset, handleSubmit, register } = methods;
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  let members: { userId: number; id: number; type?: number }[] = [];
  selectedMembers.forEach((member) =>
    members.push({
      id: 0,
      userId: member.id,
      type: typeof member.projectType === "undefined" ? 1 : member.projectType,
    })
  );
  let tasks: { id: number; taskId: number; billable?: boolean }[] = [];
  selectedTasks.forEach((task) => {
    tasks.push({ taskId: task.id, id: 0, billable: task.billable || false });
  });
  const onSaveProject = (props: IEditProject) => {
    const newProject: IEditProject = {
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
    dispatch(onSaveProject(newProject));
    reset();
  };
  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(false);
    }
  }, [progress, open, dispatch]);
  return (
    <div>
      <MenuItem disableRipple onClick={handleOpen}>
        <EditIcon />
        Edit
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Form onSubmit={handleSubmit(onSaveProject)}>
            <HeaderForm>
              <Title>Edit Project: {project.name}</Title>
              <CloseIcon onClick={handleClose} />
            </HeaderForm>
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
                    <TabTitle label="general" value="1" />
                    <TabTitle label="team" value="2" />
                    <TabTitle label="tasks" value="3" />
                  </TabList>
                </Box>
                <General
                  register={register}
                  control={control}
                  setValue={setValue}
                />
                <Team />
                <Tasks />
              </TabContext>
            </ContentForm>
            <FooterForm>
              <Button
                style={{
                  marginRight: "10px",
                  marginTop: "10px",
                  background: "#FFFFFF",
                  color: "black",
                  textTransform: "none",
                }}
                variant="contained"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  marginRight: "10px",
                  marginTop: "10px",
                  background: "#f24b50",
                  color: "black",
                  textTransform: "none",
                }}
                variant="contained"
                type="submit"
              >
                Save
              </Button>
            </FooterForm>
          </Form>
        </Container>
      </Modal>
    </div>
  );
};

export default EditProject;
