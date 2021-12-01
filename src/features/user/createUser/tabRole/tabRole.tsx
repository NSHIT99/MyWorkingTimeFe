import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../../redux/store";
import Checkbox from "@mui/material/Checkbox";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { INewUser } from "../createUser";

const NewTask = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const FormCreate = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLeft = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormRight = styled.div``;

const ListRole = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TextView = styled.div`
  font-size: 15px;
  margin-right: 20px;
`;

interface useForm {
  register: UseFormRegister<INewUser>;
  setValue: UseFormSetValue<INewUser>;
}

const TabRole: React.FC<useForm> = ({ register, setValue }) => {
  const dispatch = useDispatch();
  const roles = useSelector((state: RootState) => state.user.roles);
  const [check, setCheck] = React.useState<boolean>(false);

  return (
    <NewTask>
      <FormCreate>
        {roles.map((item, index) => {
          return (
            <ListRole>
              <FormLeft>
                <TextView>{item.name}</TextView>
                <TextView>{item.displayName}</TextView>
                <TextView>{item.description}</TextView>
              </FormLeft>
              <FormRight>
                <Checkbox
                  color="error"
                  value={check}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCheck(event.target.checked);
                    setValue(
                      "roleNames",
                      event.target.checked === true ? `${item.name}` : null
                    );
                  }}
                />
              </FormRight>
            </ListRole>
          );
        })}
      </FormCreate>
    </NewTask>
  );
};

export default TabRole;
