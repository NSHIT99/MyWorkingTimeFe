import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Snackbar } from "@mui/material";
import {
  resetProgress,
  taskSelector,
} from "../../../../redux/reducer/taskReducer";
import { RootState } from "../../../../redux/store";
import DeleteTask from "../deleteTask/deleteTask";
import EditTasks from "../editTesk/editTask";

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
`;

const TitleContent = styled.div`
  font-size: 14px;
`;

const Other = styled.div`
  padding: 10px 25px;
  gap: 50px;
`;

const TableCommon = styled.div``;

const OtherTask: React.FC = () => {
  const message = useSelector((state: RootState) => state.task.error.message);
  const searchName = useSelector((state: RootState) => state.task.searchName);
  const otherTasks = useSelector(taskSelector.getOtherTaskSelector);
  const dispatch = useDispatch();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };

  useEffect(() => {
    if (message === "") {
      handleSnackBarClose();
      dispatch(resetProgress());
    } else {
      handleOpenSnackbar();
    }
  }, [message, dispatch]);
  return (
    <Other>
      <Title>Nhiệm vụ khác ({otherTasks.length})</Title>
      <TitleContent>Các tác vụ này phải được thêm vào các dự án theo cách thủ công</TitleContent>
      <hr></hr>
      <TableCommon>
        <Title>Tên</Title>
        {otherTasks
          .filter((item) => item.name.toLowerCase().includes(searchName))
          .map((item, index) => {
            return (
              <Table
                aria-label="simple table"
                sx={{ border: 1, color: "#e9e9e9" }}
                key={index}
              >
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      scope="row"
                      sx={{ width: "5px", padding: "5px 5px" }}
                    >
                      <EditTasks task={item} />
                    </TableCell>
                    <TableCell scope="row">{item.name}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ width: "5px", padding: "5px 5px" }}
                    >
                      <DeleteTask task={item} />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          })}
      </TableCommon>
    </Other>
  );
};

export default OtherTask;
