import React from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Alert, Snackbar } from "@mui/material";
import TableHead from "@mui/material/TableHead";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import Actions from "./actions";
import dayjs from "dayjs";

const ContentTable = styled.div`
  padding: 10px 25px;
`;

const ListItemOne = styled.div`
  background: #2e95ea;
  border-radius: 10px;
  padding: 2px 3px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const ListItemTwo = styled.div`
  background: #f44336;
  border-radius: 10px;
  padding: 2px 3px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const ListItemThree = styled.div`
  background: #f89c26;
  border-radius: 10px;
  padding: 2px 3px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const ListItemfour = styled.div`
  background: #4caf50;
  border-radius: 10px;
  padding: 2px 3px;
  color: #fff;
  font-weight: bold;
  font-size: 12px;
`;

const StyleInactive = styled.button`
  background-color: #4caf50;
  border: none;
  width: 120px;
  border-radius: 3px;
  & p {
    font-size: 14px;
    color: white;
    padding: 2px;
    margin: 0;
    font-weight: 600;
  }
`;
const StyleActive = styled.button`
  background-color: red;
  border: none;
  width: 120px;
  border-radius: 3px;
  & p {
    font-size: 14px;
    color: white;
    padding: 2px;
    margin: 0;
    font-weight: 600;
  }
`;

const ItemName = styled.div``;
export const formatDay = (day: string) => dayjs(day).format("DD/MM/YYYY");
const ListProjects: React.FC = () => {
  const projects = useSelector((state: RootState) => state.project.projects);

  return (
    <ContentTable>
      <Table
        aria-label="simple table"
        sx={{
          border: 1,
          color: "#e9e9e9",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell
              colSpan={3}
              sx={{
                width: "100%",
                background: "#d3d3d3",
                padding: "10px",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            ></TableCell>
          </TableRow>
        </TableHead>
        {projects.map((item) => {
          return (
            <TableBody>
              <TableRow
                sx={{
                  "&:last-child td, &:last-child th": {
                    border: 0,
                  },
                }}
              >
                <TableCell
                  scope="row"
                  sx={{
                    width: "100%",
                    padding: "5px 5px",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                >
                  <ItemName>{item.name}</ItemName>
                  <ItemName>{item.fullName}</ItemName>
                  <ListItemOne>{item.pms}</ListItemOne>
                  <ListItemTwo>{item.activeMember} thành viên</ListItemTwo>
                  {item.projectType == 0 ? (
                    <ListItemThree>Đồ án thực tập</ListItemThree>
                  ) : item.projectType == 1 ? (
                    <ListItemThree>Đồ án chuyên ngành</ListItemThree>
                  ) : (
                    <ListItemThree>Đồ án tốt nghiệp</ListItemThree>
                  )}
                  {item.timeEnd ? (
                    <ListItemfour>
                      Ngày bắt đầu {`${formatDay(item.timeStart)} - Ngày kết thúc ${formatDay(
                        item.timeEnd
                      )}`}
                    </ListItemfour>
                  ) : (
                    <ListItemfour>
                      {`${formatDay(item.timeStart)}
                          `}
                    </ListItemfour>
                  )}
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ width: "5px", padding: "5px 5px" }}
                >
                  <Snackbar
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    autoHideDuration={2000}
                  >
                    <Alert variant="filled" severity="error"></Alert>
                  </Snackbar>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "5px" }}>
                    {item.status === 1 ? (
                      <StyleInactive>
                        <p>Đã xong</p>
                      </StyleInactive>
                    ) : (
                      <StyleActive>
                        <p>Đang hoạt động</p>
                      </StyleActive>
                    )}
                    <Actions project={item} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          );
        })}
      </Table>
    </ContentTable>
  );
};

export default ListProjects;
