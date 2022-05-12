import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { RootState } from "../../../redux/store";
import Checkbox from "@mui/material/Checkbox";
import { setAcceptId } from "../../../redux/reducer/myworkingtimeReducer";

const ContentTable = styled.div`
  padding: 10px 25px;
`;

const NumberWorkingTime = styled.div`
  text-align: center;
`;

export const formatDay = (day: string) => dayjs(day).format("DD/MM/YYYY");
const ListWorkingTime: React.FC = () => {
  const dispatch = useDispatch();
  const workingtimes = useSelector(
    (state: RootState) => state.workingtime.workingtimes
  );
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [checkedList, setCheckedList] = useState<number[]>([]);

  const handleChange2 = (id: number) => {
    setCheckedList((pre) => {
      if (pre.includes(id)) {
        return pre.filter((v) => v !== id);
      }
      return [...pre, ...[id]];
    });
  };

  const handleCheckAll = () => {
    if (checkedList.length === 0) {
      const listAllIds = workingtimes.map((v) => v.id);
      setCheckedList(listAllIds);
    } else {
      setCheckedList([]);
    }
  };

  useEffect(() => {
    dispatch(setAcceptId(checkedList));
  }, [checkedList]);

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
          <TableRow
            sx={{
              "&:last-child td, &:last-child th": {
                border: 0,
              },
            }}
          >
            <TableCell
              colSpan={3}
              sx={{
                background: "#d3d3d3",
                fontSize: "16px",
              }}
            >
              Tên đồ án
            </TableCell>
            <TableCell
              colSpan={3}
              sx={{
                background: "#d3d3d3",
                fontSize: "16px",
              }}
            >
              Công việc
            </TableCell>
            <TableCell
              colSpan={3}
              sx={{
                background: "#d3d3d3",
                fontSize: "16px",
              }}
            >
              Thời gian làm việc
            </TableCell>
            <TableCell
              colSpan={3}
              sx={{
                background: "#d3d3d3",
                fontSize: "16px",
              }}
            >
              Trạng thái
            </TableCell>
            <TableCell
              colSpan={3}
              sx={{
                background: "#d3d3d3",
                fontSize: "16px",
              }}
            >
              Ghi chú
            </TableCell>

            <TableCell
              colSpan={3}
              sx={{
                background: "#d3d3d3",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Checkbox
                {...label}
                checked={checkedList.length === workingtimes.length}
                indeterminate={
                  !!checkedList.length &&
                  checkedList.length !== workingtimes.length
                }
                onChange={handleCheckAll}
              />
              <NumberWorkingTime>
                {checkedList.length}/{workingtimes.length}
              </NumberWorkingTime>
            </TableCell>
          </TableRow>
        </TableHead>
        {workingtimes.map((item) => {
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
                  colSpan={3}
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {item.projectName}
                </TableCell>
                <TableCell
                  colSpan={3}
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  {item.task}
                </TableCell>
                <TableCell
                  colSpan={3}
                  sx={{
                    fontSize: "16px",
                  }}
                >
                  0{item.workingTime}:00
                </TableCell>
                {item.status == 0 ? (
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    Chưa gửi
                  </TableCell>
                ) : item.status == 1 ? (
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    Đang chờ
                  </TableCell>
                ) : item.status == 2 ? (
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    Xác nhận
                  </TableCell>
                ) : (
                  <TableCell
                    colSpan={3}
                    sx={{
                      fontSize: "16px",
                    }}
                  >
                    Huỷ bỏ
                  </TableCell>
                )}
                <TableCell colSpan={3}>{item.mytimesheetNote}</TableCell>
                <TableCell colSpan={3}>
                  <Checkbox
                    {...label}
                    checked={checkedList.includes(item.id)}
                    onChange={() => handleChange2(item.id)}
                    value={item.id}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          );
        })}
      </Table>
    </ContentTable>
  );
};

export default ListWorkingTime;
