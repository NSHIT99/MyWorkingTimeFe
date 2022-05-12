import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";
import { RootState } from "../../../redux/store";
import {
  resetProgress,
  resetRejectProgress,
} from "../../../redux/reducer/workingtimeReducer";
import { rejectWorkingtimesActions } from "../../../redux/actions/workingtime";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const Accept = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const BtnAccept = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const RejectWorkingtime: React.FC = () => {
  const { reset, control, handleSubmit } = useForm<any>();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { enqueueSnackbar } = useSnackbar();
  const handleClose = () => setOpen(false);

  const progress = useSelector(
    (state: RootState) => state.workingtime.progress
  );
  const message = useSelector(
    (state: RootState) => state.workingtime.messageReject
  );
  const idReject = useSelector(
    (state: RootState) => state.myworkingtime.acceptId
  );

  const handleReject = async () => {
    dispatch(rejectWorkingtimesActions({ idReject }));
  };

  const rejectProgress = useSelector(
    (state: RootState) => state.workingtime.rejectProgress
  );
  useEffect(() => {
    if (progress === "done" && open && rejectProgress === "done") {
      enqueueSnackbar(message, { variant: "success" });
      dispatch(resetProgress());
      dispatch(resetRejectProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress, open, dispatch, rejectProgress]);

  return (
    <Accept>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        Huỷ bỏ
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(handleReject)}>
            <TitleHeader>Bạn có muốn huỷ bỏ các mục này?</TitleHeader>
            <BtnAccept>
              <Button
                variant="outlined"
                color="error"
                sx={{ color: "#333333" }}
                onClick={handleClose}
              >
                Huỷ bỏ
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                sx={{ background: "#f24b50", color: "#333333" }}
              >
                xác nhận
              </Button>
            </BtnAccept>
          </form>
        </Box>
      </Modal>
    </Accept>
  );
};

export default RejectWorkingtime;
