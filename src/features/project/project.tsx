import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { setSearchName } from "../../redux/reducer/taskReducer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { getProject } from "../../redux/actions/project";
import { projectSelector } from "../../redux/reducer/projectReducer";
// import CreateProjects from "./component/createProject/createProject";
import ListProjects from "./component/listProject/listProject";
import CreateProjects from "./component/createProject/createProject";

const ProjectContent = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderProject = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const TitleHeader = styled.div`
  font-size: 22px;
`;

const AddContent = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  gap: 50px;
`;

const Projects: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProject({ status: 0 }));
  }, [dispatch]);
  const handleStatus0 = () => {
    dispatch(getProject({ status: 0 }));
  };
  const handleStatus1 = () => {
    dispatch(getProject({ status: 1 }));
  };
  const handleStatus = () => {
    dispatch(getProject({}));
  };
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    dispatch(
      setSearchName({
        searchName: searchItem,
      })
    );
  }, [searchItem, dispatch]);
  const ProjectStatus = useSelector(projectSelector.getAllProjectSelector);
  const ProjectStatus0 = useSelector(projectSelector.getAllProjectStatus0);
  const ProjectStatus1 = useSelector(projectSelector.getAllProjectStatus1);

  const [projects, setProjects] = React.useState("0");
  const handleChange = (event: SelectChangeEvent) => {
    setProjects(event.target.value as string);
  };

  return (
    <ProjectContent>
      <HeaderProject>
        <TitleHeader>Manage Projects</TitleHeader>
        <MoreVertIcon />
      </HeaderProject>
      <hr />
      <AddContent>
        <CreateProjects />
        <FormControl sx={{ width: "230px", left: "50px" }}>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={projects}
            onChange={handleChange}
          >
            <MenuItem value={0} onClick={handleStatus0}>
              Active Projects ({ProjectStatus0.length})
            </MenuItem>
            <MenuItem value={1} onClick={handleStatus1}>
              Deactive Projects ({ProjectStatus1.length})
            </MenuItem>
            <MenuItem value={2} onClick={handleStatus}>
              All Projects ({ProjectStatus.length})
            </MenuItem>
          </Select>
        </FormControl>
      </AddContent>
      <ListProjects />
    </ProjectContent>
  );
};

export default Projects;
