import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from "notistack";

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

const AccpetWorkingtime: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Accept>
      <Button variant="contained" color="success" onClick={handleOpen}>
        Xác nhận
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
          <form>
            <TitleHeader>Bạn có muốn xác nhận tất cả</TitleHeader>
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

export default AccpetWorkingtime;
