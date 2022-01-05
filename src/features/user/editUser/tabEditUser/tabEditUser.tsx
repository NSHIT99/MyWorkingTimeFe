import React from "react";
import { MenuItem } from "@mui/material";
import styled from "styled-components";
import { Controller, Control, UseFormSetValue } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import { IUpdateUser } from "../EditUser";
import { TabPanel } from "@mui/lab";

const FormLeft = styled.div`
  width: 45%;
`;

const FormRight = styled.div`
  width: 45%;
`;

const FormCreate = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface props {
  control: Control<IUpdateUser, object>;
  setValue: UseFormSetValue<IUpdateUser>;
}

export const TabEditUser = ({ control, setValue }: props) => {
  return (
    <TabPanel value="1" sx={{ paddingTop: "20px", paddingLeft: "0" }}>
      <FormCreate>
        <FormLeft>
          <Controller
            name="userName"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập username"
                  sx={{
                    border: "1px solid #dfa3a31e",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="name"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập tên"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="avatarPath"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập avatar"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="branch"
            render={({ field }) => {
              return (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& div": { padding: "8px 0" },
                  }}
                  {...field}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>58K1</MenuItem>
                  <MenuItem value={2}>58K2</MenuItem>
                  <MenuItem value={3}>58K3</MenuItem>
                  <MenuItem value={4}>58K4</MenuItem>
                  <MenuItem value={5}>59K1</MenuItem>
                  <MenuItem value={6}>59K2</MenuItem>
                  <MenuItem value={7}>59K3</MenuItem>
                  <MenuItem value={8}>59K4</MenuItem>
                  <MenuItem value={9}>60K1</MenuItem>
                  <MenuItem value={10}>60K2</MenuItem>
                  <MenuItem value={11}>60K3</MenuItem>
                  <MenuItem value={12}>60K4</MenuItem>
                  <MenuItem value={13}>61K1</MenuItem>
                  <MenuItem value={14}>61K2</MenuItem>
                  <MenuItem value={15}>61K3</MenuItem>
                  <MenuItem value={16}>61K4</MenuItem>
                </Select>
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="sex"
            render={({ field }) => {
              return (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  {...field}
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& div": { padding: "8px 0" },
                  }}
                >
                  <MenuItem value={0}>Nam</MenuItem>
                  <MenuItem value={1}>Nữ</MenuItem>
                </Select>
              );
            }}
            control={control}
            defaultValue=""
          />
        </FormLeft>
        <FormRight>
          <Controller
            name="emailAddress"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập email"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="address"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập địa chỉ"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="surname"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập họ"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="phoneNumber"
            render={({ field }) => {
              return (
                <TextField
                  hiddenLabel
                  id="standard-basic"
                  variant="standard"
                  {...field}
                  placeholder="Mời nhập SĐT"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& input": { padding: "10px" },
                  }}
                />
              );
            }}
            control={control}
            defaultValue=""
          />
          <Controller
            name="type"
            render={({ field }) => {
              return (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  sx={{
                    border: "1px solid rgba(0,0,0,.12)",
                    width: "100%",
                    marginBottom: "20px",
                    "& div": { padding: "8px 0" },
                  }}
                  {...field}
                >
                  <MenuItem value={0}>None</MenuItem>
                  <MenuItem value={1}>Leader</MenuItem>
                  <MenuItem value={2}>Member</MenuItem>
                  <MenuItem value={3}>Manager</MenuItem>
                </Select>
              );
            }}
            control={control}
            defaultValue=""
          />
        </FormRight>
      </FormCreate>
    </TabPanel>
  );
};
