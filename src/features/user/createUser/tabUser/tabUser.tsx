import React from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { INewUser } from "../createUser";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

const NewUser = styled.div`
  display: flex;
  gap: 250px;
`;

const FormCreate = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormLeft = styled.div`
  width: 45%;
`;

const FormRight = styled.div`
  width: 45%;
`;

interface useForm {
  register: UseFormRegister<INewUser>;
  setValue: UseFormSetValue<INewUser>;
}

interface State {
  password: string;
  showPassword: boolean;
}

const TabUser: React.FC<useForm> = ({ register }) => {
  const [branch, setBranch] = React.useState("");
  const handleChangeBranch = (event: SelectChangeEvent) => {
    setBranch(event.target.value as string);
  };
  const [sex, setSex] = React.useState("");
  const handleChangeSex = (event: SelectChangeEvent) => {
    setSex(event.target.value as string);
  };
  const [type, setType] = React.useState("");
  const handleChangeType = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const [values, setValues] = React.useState<State>({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <NewUser>
      <FormCreate>
        <FormLeft>
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập username"
            {...register("userName", { required: true })}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
          />
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            {...register("password", { required: true })}
            onChange={handleChange("password")}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập tên"
            {...register("name", { required: true })}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={branch}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& div": { padding: "8px 0" },
            }}
            {...register("branch", { required: true })}
            onChange={handleChangeBranch}
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
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sex}
            {...register("sex", { required: true })}
            onChange={handleChangeSex}
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
        </FormLeft>
        <FormRight>
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập email"
            {...register("emailAddress", { required: true })}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
          />
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập địa chỉ"
            {...register("address", { required: true })}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
          />
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập họ"
            {...register("surname", { required: true })}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
          />
          <TextField
            hiddenLabel
            id="standard-basic"
            variant="standard"
            placeholder="Mời nhập SĐT"
            {...register("phoneNumber", { required: true })}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& input": { padding: "10px" },
            }}
          />
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            {...register("type", { required: true })}
            onChange={handleChangeType}
            sx={{
              border: "1px solid rgba(0,0,0,.12)",
              width: "100%",
              marginBottom: "20px",
              "& div": { padding: "8px 0" },
            }}
          >
            <MenuItem value={0}>Nhóm trưởng</MenuItem>
            <MenuItem value={1}>Giáo viên phụ trách</MenuItem>
            <MenuItem value={2}>Thành viên</MenuItem>
          </Select>
        </FormRight>
      </FormCreate>
    </NewUser>
  );
};

export default TabUser;
