import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import TableHead from "@mui/material/TableHead";
import { resetProgress, roleSelector } from "../../../redux/reducer/roleReducer";
import ActionsRole from "./actionsRole/actionsRole";

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

const ListRoles: React.FC = () => {
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.role.progress);
  useEffect(() => {
    if (progress === "done") {
      dispatch(resetProgress());
    }
  }, [progress, dispatch]);

  const roles = useSelector(roleSelector.getAllRoleSelector);

  return (
    <Common>
      <Title>Danh sách ({roles.length})</Title>
      <TitleContent>Danh sách được phân quyền</TitleContent>
      <hr />
      <TableCommon>
        <Table aria-label="simple table" sx={{ border: 0 }}>
          <TableHead>
            <TableRow
              sx={{
                "& th": { border: "1px solid #ccc", background: "#e9e9e9" },
              }}
            >
              <TableCell scope="row">STT</TableCell>
              <TableCell scope="row">Vai trò</TableCell>
              <TableCell scope="row">Kí hiệu</TableCell>
              <TableCell scope="row">Đặc điểm</TableCell>
              <TableCell scope="row">Tuỳ chỉnh</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((item, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& td": { border: "1px solid #ccc" },
                  }}
                >
                  <TableCell scope="row">{index + 1}</TableCell>
                  <TableCell scope="row">{item.name}</TableCell>
                  <TableCell scope="row">{item.displayName}</TableCell>
                  <TableCell scope="row">{item.description}</TableCell>
                  <TableCell scope="row">
                    <ActionsRole role={item} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableCommon>
    </Common>
  );
};

export default ListRoles;
