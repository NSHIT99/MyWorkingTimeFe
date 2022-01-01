import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { INewProject } from "../../createProject";

const NewGeneral = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormList = styled.div`
  display: flex;
  align-items: flex-start;
  padding-bottom: 20px;
`;

const ListName = styled.div`
  width: 120px;
`;
const ListInput = styled.div``;
const CheckboxUser = styled.div`
  display: flex;
  align-items: center;
`;
const Title = styled.div``;
const BtnProjectType = styled(Button)`
  width: 200px;
`;

interface useForm {
  register: UseFormRegister<INewProject>;
  setValue: UseFormSetValue<INewProject>;
}

const General: React.FC<useForm> = ({ register, setValue }) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [Active, setActive] = React.useState("Fixed Fee");

  return (
    <NewGeneral>
      <FormList>
        <ListName>ProjectName*</ListName>
        <TextField
          hiddenLabel
          id="outlined-basic"
          variant="outlined"
          placeholder="Project name"
          {...register("name", { required: true })}
          sx={{
            border: "1px solid rgba(0,0,0,.12)",
            width: "50%",
          }}
        />
      </FormList>
      <FormList>
        <ListName>Project Code*</ListName>
        <TextField
          hiddenLabel
          id="outlined-basic"
          variant="outlined"
          placeholder="Project code"
          {...register("code", { required: true })}
          sx={{
            border: "1px solid rgba(0,0,0,.12)",
            width: "30%",
          }}
        />
      </FormList>
      <FormList>
        <ListName>Dates*</ListName>
        <TextField
          style={{ width: "24%" }}
          type="date"
          {...register("timeStart")}
        />
        <p style={{ padding: "0 5px" }}>to</p>
        <TextField
          style={{ width: "24%" }}
          type="date"
          {...register("timeEnd")}
        />
      </FormList>
      <FormList>
        <ListName>Note</ListName>
        <ListInput>
          <TextareaAutosize
            {...register("note")}
            minRows={3}
            aria-label="empty textarea"
            style={{ width: 800 }}
          />
        </ListInput>
      </FormList>
      <FormList style={{ paddingBottom: "0" }}>
        <ListName>All User</ListName>
        <CheckboxUser>
          <Checkbox {...label} {...register("isAllUserBelongTo")} />
          <Title>
            Auto add user as a member of this project when creating new user
          </Title>
        </CheckboxUser>
      </FormList>
      <FormList>
        <ListName>Project Type*</ListName>
        <Stack spacing={2} direction="row">
          <BtnProjectType
            variant="outlined"
            style={{
              color: "#000",
              background: Active === "Time & Materials" ? "#f36c00" : "#fff",
            }}
            onClick={() => {
              setActive("Time & Materials");
              setValue("projectType", 0);
            }}
          >
            Time & Materials
          </BtnProjectType>
          <BtnProjectType
            variant="outlined"
            style={{
              color: "#000",
              background: Active === "Fixed Fee" ? "#f36c00" : "#fff",
            }}
            onClick={() => {
              setActive("Fixed Fee");
              setValue("projectType", 1);
            }}
          >
            Fixed Fee
          </BtnProjectType>
          <BtnProjectType
            variant="outlined"
            style={{
              color: "#000",
              background: Active === "Non-Billable" ? "#f36c00" : "#fff",
            }}
            onClick={() => {
              setActive("Non-Billable");
              setValue("projectType", 2);
            }}
          >
            Non-Billable
          </BtnProjectType>
          <BtnProjectType
            variant="outlined"
            style={{
              color: "#000",
              background: Active === "OBC" ? "#f36c00" : "#fff",
            }}
            onClick={() => {
              setActive("OBC");
              setValue("projectType", 3);
            }}
          >
            OBC
          </BtnProjectType>
        </Stack>
      </FormList>
    </NewGeneral>
  );
};

export default General;
