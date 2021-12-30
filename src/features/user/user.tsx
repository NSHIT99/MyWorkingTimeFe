import React, { useEffect } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { getAllActions } from "../../redux/actions/user";
import ListUsers from "./listUser/listUser";
import CreateUser from "./createUser/createUser";

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

const Users: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllActions());
  }, [dispatch]);

  return (
    <TaskContent>
      <HeaderTask>
        <TitleHeader>Người dùng</TitleHeader>
        <MoreVertIcon />
      </HeaderTask>
      <hr></hr>
      <AddContent>
        <Search>
          <CreateUser />
        </Search>
      </AddContent>
      <ListUsers />
    </TaskContent>
  );
};

export default Users;
