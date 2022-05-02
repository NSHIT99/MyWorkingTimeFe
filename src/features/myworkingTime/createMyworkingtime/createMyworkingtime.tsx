import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useSnackbar } from "notistack";
import { NativeSelect } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useForm, Controller } from "react-hook-form";
import { getProjectsInTasksActions } from "../../../redux/actions/myworkingtime";
import { RootState } from "../../../redux/store";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const NewMyworkingtime = styled.div`
  display: flex;
  gap: 250px;
`;

const BtnNewMyworkingtime = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const InputName = styled(TextField)``;

const CreateMyworkingtime: React.FC = () => {
  const { reset, control, handleSubmit } = useForm<any>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const projectsintasks = useSelector(
    (state: RootState) => state.myworkingtime.projectsintasks
  );
  useEffect(() => {
    dispatch(getProjectsInTasksActions());
  }, []);

  return (
    <NewMyworkingtime>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Tạo mới
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form>
            <TitleHeader>Tạo thời gian làm việc</TitleHeader>
            <Controller
              name="type"
              render={({ field }) => (
                <NativeSelect {...field} style={{ width: "100%" }}>
                  {projectsintasks.map((item, index) => {
                    return (
                      <option value={index}>
                        {item.projectName}({item.listPM.join("-")})
                      </option>
                    );
                  })}
                </NativeSelect>
              )}
              control={control}
              defaultValue=""
            />
            <Controller
              name="type"
              render={({ field }) => (
                <NativeSelect {...field} style={{ width: "100%" }}>
                  <option value={0}>abc</option>;
                </NativeSelect>
              )}
              control={control}
              defaultValue=""
            />
            <Controller
              name="name"
              render={({ field }) => {
                return (
                  <InputName
                    label="Ghi chú *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
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
                  <InputName
                    label="ThờI gian làm việc *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <Controller
              name="typeOfWork"
              render={({ field }) => (
                <NativeSelect {...field} style={{ width: "100%" }}>
                  <option value={0}>Thời gian quy định</option>
                  <option value={1}>Làm việc thêm</option>
                </NativeSelect>
              )}
              control={control}
              defaultValue=""
            />
            <BtnNewMyworkingtime>
              <Button
                variant="outlined"
                color="error"
                sx={{ color: "#333333" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ background: "#f24b50", color: "#333333" }}
              >
                Save
              </Button>
            </BtnNewMyworkingtime>
          </form>
        </Box>
      </Modal>
    </NewMyworkingtime>
  );
};

export default CreateMyworkingtime;
