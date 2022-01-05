import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../redux/store";
import Checkbox from "@mui/material/Checkbox";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { INewUser } from "../createUser";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

const NewTask = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const FormCreate = styled.div`
  display: flex;
  flex-direction: column;
`;

interface useForm {
  register: UseFormRegister<INewUser>;
  setValue: UseFormSetValue<INewUser>;
}

const TabRole: React.FC<useForm> = ({ setValue }) => {
  const roles = useSelector((state: RootState) => state.user.roles);
  const [check, setCheck] = React.useState<boolean>(false);

  return (
    <NewTask>
      <FormCreate>
        {roles.map((item, index) => {
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
                          event.target.checked === true ? `${item.name}` : null
                        );
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          );
        })}
      </FormCreate>
    </NewTask>
  );
};

export default TabRole;
