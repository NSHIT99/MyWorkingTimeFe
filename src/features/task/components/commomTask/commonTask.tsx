import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  resetProgress,
  taskSelector,
} from "../../../../redux/reducer/taskReducer";
import { RootState } from "../../../../redux/store";
import Button from "@mui/material/Button";
import Archive from "../archiveTask/archiveTask";
import DeArchiveTask from "../deArchiveTask/deArchiveTask";
import DeleteTask from "../deleteTask/deleteTask";
import { Alert, Snackbar } from "@mui/material";
import EditTasks from "../editTesk/editTask";

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
`;

const TitleContent = styled.div`
  font-size: 14px;
`;

const Common = styled.div`
  padding: 10px 25px;
  gap: 50px;
`;

const TableCommon = styled.div``;

const ItemRight = styled.div`
  display: flex;
  gap: 10px;
`;

const CommonTask: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const error = useSelector((state: RootState) => state.task.error.message);
  const handleClick = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const handleOpenSnackbar = () => {
    setOpen(false);
    setOpenSnackbar(true);
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };
  const progress = useSelector((state: RootState) => state.task.progress);
  useEffect(() => {
    if (progress === "done" && open) {
      dispatch(resetProgress());
      setOpen(true);
      handleOpenSnackbar();
    }
  }, [progress, open, dispatch]);

  const message = useSelector((state: RootState) => state.task.error.message);
  const searchName = useSelector((state: RootState) => state.task.searchName);
  const commonTasks = useSelector(taskSelector.getCommonTaskSelector);

  return (
    <Common>
      <Title>Nhiệm vụ chung ({commonTasks.length})</Title>
      <TitleContent>
        Các nhiệm vụ này được tự động thêm vào tất cả các dự án mới
      </TitleContent>
      <hr />
      <TableCommon>
        <Title>Tên</Title>

        {commonTasks
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
                    <TableCell scope="row" sx={{ width: "5px", padding: "0" }}>
                      <EditTasks task={item} />
                    </TableCell>
                    <TableCell scope="row">{item.name}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ width: "5px", padding: "5px 5px" }}
                      onClick={handleClick}
                    >
                      {!item.isDeleted ? (
                        <ItemRight>
                          <Archive task={item} />
                          <Button
                            variant="outlined"
                            sx={{ color: "#333333" }}
                            style={{ background: "#0000001f" }}
                            disabled
                          >
                            Xoá
                          </Button>
                        </ItemRight>
                      ) : (
                        <ItemRight>
                          <DeArchiveTask task={item} />
                          <DeleteTask task={item} />
                        </ItemRight>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            );
          })}
      </TableCommon>
    </Common>
  );
};

export default CommonTask;
