import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import Modal from "@mui/material/Modal";
import { useForm, Controller } from "react-hook-form";
import { NativeSelect } from "@mui/material";
import { useSnackbar } from "notistack";
import { RootState } from "../../../redux/store";
import { ICreateCommentReq } from "../../../interfaces/comment/comment";
import { createComment } from "../../../redux/actions/comment";
import {
  resetCreateProgress,
  resetProgress,
} from "../../../redux/reducer/commentReducer";

const TitleHeader = styled.div`
  font-size: 22px;
`;

const NewComment = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const BtnNewComment = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const InputName = styled(TextField)``;

interface INewComment {
  title: string;
}

const CreateComments: React.FC<{ idWorkingtime: any }> = ({
  idWorkingtime,
}) => {
  const { reset, control, handleSubmit } = useForm<INewComment>();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const createProgress = useSelector(
    (state: RootState) => state.comment.createProgress
  );
  const message = useSelector(
    (state: RootState) => state.comment.error.message
  );
  const handleCreate = async (props: ICreateCommentReq) => {
    dispatch(
      createComment({
        title: props.title,
        idWorkingtime: idWorkingtime,
      })
    );
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (createProgress === "done" && open) {
      enqueueSnackbar("Tạo công việc thành công", { variant: "success" });
      dispatch(resetProgress());
      dispatch(resetCreateProgress());
      setOpen(false);
    } else if (createProgress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [createProgress, open, dispatch]);

  return (
    <NewComment>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Đánh giá
      </Button>
      <Modal open={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "#fff",
            pt: 2,
            px: 4,
            pb: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(handleCreate)}>
            <TitleHeader>Tự đánh giá</TitleHeader>
            <Controller
              name="title"
              render={({ field }) => {
                return (
                  <InputName
                    label="Tự đánh giá *"
                    variant="standard"
                    {...field}
                    style={{ width: "100%", marginBottom: "10px" }}
                  />
                );
              }}
              control={control}
              defaultValue=""
            />
            <BtnNewComment>
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
            </BtnNewComment>
          </form>
        </Box>
      </Modal>
    </NewComment>
  );
};

export default CreateComments;
