import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
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
  background-color: #9e9e9e;
  border: none;
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
  background-color: #4caf50;
  border: none;
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
                >
                </TableCell>
              </TableRow>
            </TableHead>
            {projects
              .map((item) => {
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
                        <ListItemOne>{item.pms}</ListItemOne>
                        <ListItemTwo>{item.activeMember} members</ListItemTwo>
                        {item.projectType == 0 ? (
                          <ListItemThree>Internship project</ListItemThree>
                        ) : item.projectType == 1 ? (
                          <ListItemThree>Specialized project</ListItemThree>
                        ) : item.projectType == 2 ? (
                          <ListItemThree>Final project</ListItemThree>
                        ) : (
                          <ListItemThree>None</ListItemThree>
                        )}
                        {item.timeEnd ? (
                          <ListItemfour>
                            {`${formatDay(item.timeStart)}-${formatDay(
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
                        <div style={{display: "flex", justifyContent: "flex-end"}}>
                        {item.status === 1 ? (
                          <StyleInactive>
                            <p>Inactive</p>
                          </StyleInactive>
                        ) : (
                          <StyleActive>
                            <p>Active</p>
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
