import React, { useEffect } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { getAllRoleActions } from "../../redux/actions/role";
import ListRoles from "./listRole/listRole";
import CreateRole from "./createRole/createRole";

const TaskContent = styled.div`
  width: 100%;
  height: 100%;
`;

const HeaderTask = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const TitleHeader = styled.div`
  font-size: 22px;
`;

const AddContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Search = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 150px;
`;

const Roles: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllRoleActions());
  }, [dispatch]);

  return (
    <TaskContent>
      <HeaderTask>
        <TitleHeader>Vai trò</TitleHeader>
        <MoreVertIcon />
      </HeaderTask>
      <hr></hr>
      <AddContent>
        <Search>
          <CreateRole />
        </Search>
      </AddContent>
      <ListRoles />
    </TaskContent>
  );
};

export default Roles;
