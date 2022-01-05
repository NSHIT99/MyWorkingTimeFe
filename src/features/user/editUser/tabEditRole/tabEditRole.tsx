import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../redux/store";
import Checkbox from "@mui/material/Checkbox";
import {
  Control,
  Controller,
  UseFormSetValue,
} from "react-hook-form";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { IUpdateUser } from "../EditUser";
import { TabPanel } from "@mui/lab";

const FormCreate = styled.div`
  display: flex;
  flex-direction: column;
`;

interface props {
  control: Control<IUpdateUser, object>;
  setValue: UseFormSetValue<IUpdateUser>;
}

const TabEditRole = ({ control, setValue }: props) => {
  const roles = useSelector((state: RootState) => state.user.roles);
  const [check, setCheck] = React.useState<boolean>(false);

  return (
    <TabPanel value="2" sx={{ paddingTop: "20px", paddingLeft: "0" }}>
      <FormCreate>
        {roles.map((item, index) => {
          return (
            <Controller
              name="roleNames"
              render={({ field }) => {
                return (
                  <Table
                    aria-label="simple table"
                    sx={{ border: 1, color: "#e9e9e9" }}
                    key={index}
                  >
                    <TableBody>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell scope="row">{item.name}</TableCell>
                        <TableCell scope="row">{item.displayName}</TableCell>
                        <TableCell scope="row">{item.description}</TableCell>
                        <TableCell scope="row" align="right">
                          <Checkbox
                            color="error"
                            value={check}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setCheck(event.target.checked);
                              setValue(
                                "roleNames",
                                event.target.checked === true
                                  ? `${item.name}`
                                  : ""
                              );
                            }}
                            />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                );
              }}
              control={control}
              defaultValue=""
            />
          );
        })}
      </FormCreate>
    </TabPanel>
  );
};

export default TabEditRole;
