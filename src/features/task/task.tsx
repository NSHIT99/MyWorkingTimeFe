import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import { getTask } from "../../redux/actions/task";
import { setSearchName } from "../../redux/reducer/taskReducer";
import CreateTasks from "./components/createTask/createTask";
import SearchTask from "./components/searchTeak/searchTask";
import CommonTask from "./components/commomTask/commonTask";
import OtherTask from "./components/otherTask/otherTask";

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

const Tasks: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTask());
  });
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    dispatch(
      setSearchName({
        searchName: searchItem,
      })
    );
  }, [searchItem, dispatch]);

  return (
    <TaskContent>
      <HeaderTask>
        <TitleHeader>Quản lý công việc</TitleHeader>
        <MoreVertIcon />
      </HeaderTask>
      <hr></hr>
      <AddContent>
        <Search>
          <CreateTasks />
          <SearchTask setSearchKey = {setSearchItem} />
        </Search>
      </AddContent>
      <CommonTask />
      <OtherTask />
    </TaskContent>
  );
};

export default Tasks;
