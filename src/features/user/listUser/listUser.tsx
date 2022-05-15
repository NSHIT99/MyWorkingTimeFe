import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  resetUserProgress as resetProgress,
  userSelector,
} from "../../../redux/reducer/userRuducer";
import { RootState } from "../../../redux/store";
import TableHead from "@mui/material/TableHead";
import ActionsUser from "./actionsUser/actionsUser";

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 30px;
`;

const TitleContent = styled.div`
  font-size: 14px;
`;

const UserList = styled.div`
  padding: 10px 25px;
  gap: 50px;
`;

const TableUser = styled.div``;

const ListUsers: React.FC = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.user.progress);
  useEffect(() => {
    if (progress === "done") {
      dispatch(resetProgress());
    }
  }, [progress, dispatch]);

  const users = useSelector(userSelector.getAllUserSelector);

  return (
    <UserList>
      <Title>Danh sách ({users.length})</Title>
      <TitleContent>Danh sách các thành viên trong MyWorkingTime</TitleContent>
      <hr />
      <TableUser>
        <Table aria-label="simple table" sx={{ border: 0 }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  border: "1px solid #ccc",
                  background: "#e9e9e9",
                  textAlign: "center",
                },
              }}
            >
              <TableCell scope="row">STT</TableCell>
              <TableCell scope="row">UserName</TableCell>
              <TableCell scope="row">Email</TableCell>
              <TableCell scope="row">Họ và tên</TableCell>
              <TableCell scope="row">Giới tính</TableCell>
              <TableCell scope="row">Địa chỉ</TableCell>
              <TableCell scope="row">SĐT</TableCell>
              <TableCell scope="row">Lớp</TableCell>
              <TableCell scope="row">Nhiệm vụ</TableCell>
              <TableCell scope="row">Quyền</TableCell>
              <TableCell scope="row">Tuỳ chỉnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& td": { border: "1px solid #ccc" },
                  }}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell scope="row">{item.userName}</TableCell>
                  <TableCell scope="row">{item.emailAddress}</TableCell>
                  <TableCell scope="row">{item.fullName}</TableCell>
                  {item.sex == 0 ? (
                    <TableCell scope="row">Nam</TableCell>
                  ) : (
                    <TableCell scope="row">Nữ</TableCell>
                  )}
                  <TableCell scope="row">{item.address}</TableCell>
                  <TableCell scope="row">{item.phoneNumber}</TableCell>
                  {item.branch == 1 ? (
                    <TableCell scope="row">58K1</TableCell>
                  ) : item.branch == 2 ? (
                    <TableCell scope="row">58K2</TableCell>
                  ) : item.branch == 3 ? (
                    <TableCell scope="row">58K3</TableCell>
                  ) : item.branch == 4 ? (
                    <TableCell scope="row">58K4</TableCell>
                  ) : item.branch == 5 ? (
                    <TableCell scope="row">59K1</TableCell>
                  ) : item.branch == 6 ? (
                    <TableCell scope="row">59K2</TableCell>
                  ) : item.branch == 7 ? (
                    <TableCell scope="row">59K3</TableCell>
                  ) : item.branch == 8 ? (
                    <TableCell scope="row">59K4</TableCell>
                  ) : item.branch == 9 ? (
                    <TableCell scope="row">60K1</TableCell>
                  ) : item.branch == 10 ? (
                    <TableCell scope="row">60K2</TableCell>
                  ) : item.branch == 11 ? (
                    <TableCell scope="row">60K3</TableCell>
                  ) : item.branch == 12 ? (
                    <TableCell scope="row">60K4</TableCell>
                  ) : item.branch == 13 ? (
                    <TableCell scope="row">61K1</TableCell>
                  ) : item.branch == 14 ? (
                    <TableCell scope="row">61K2</TableCell>
                  ) : item.branch == 15 ? (
                    <TableCell scope="row">61K3</TableCell>
                  ) : item.branch == 16 ? (
                    <TableCell scope="row">61K4</TableCell>
                  ) : (
                    <TableCell scope="row">None</TableCell>
                  )}
                  {item.type == 0 ? (
                    <TableCell scope="row">Nhóm trưởng</TableCell>
                  ) : item.type == 1 ? (
                    <TableCell scope="row">GV phụ trách</TableCell>
                  ) : (
                    <TableCell scope="row">Thành viên</TableCell>
                  )}
                  <TableCell scope="row">{item.roleNames}</TableCell>
                  <TableCell scope="row">
                    <ActionsUser user={item} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableUser>
    </UserList>
  );
};

export default ListUsers;
