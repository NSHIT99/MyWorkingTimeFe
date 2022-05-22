import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { getComment } from "../../../redux/actions/comment";

const NewComment = styled.div`
  display: flex;
  padding: 10px 25px;
  gap: 250px;
`;

const TitleHeader = styled.div`
  font-size: 22px;
  font-weight: bold;
`;

const BtnNewMyworkingtime = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  padding-top: 30px;
`;

const CommentsList: React.FC<{ idWorkingtime: any }> = ({ idWorkingtime }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComment(idWorkingtime));
  }, []);
  const progressComment = useSelector(
    (state: RootState) => state.comment.progress
  );
  const comments: any = useSelector(
    (state: RootState) => state.comment.comments
  );

  const RenderComments: any = () => {
    if (comments)
      return (
        <div>
          <div style={{ fontSize: "16px", color: "Red", marginTop: "10px" }}>
            {comments[0].title}
          </div>
          <div
            style={{ fontSize: "18px", textAlign: "right", marginTop: "10px" }}
          >
            {comments[0].username}
          </div>
        </div>
      );
    else return <div></div>;
  };

  return (
    <NewComment>
      <Button
        style={{ background: "#f24b50", height: "40px" }}
        variant="contained"
        onClick={handleOpen}
      >
        Comment
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
            <TitleHeader>Nhận xét và đánh giá</TitleHeader>
            <RenderComments />
            <BtnNewMyworkingtime>
              <Button
                variant="outlined"
                color="error"
                sx={{ color: "#333333" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
            </BtnNewMyworkingtime>
          </form>
        </Box>
      </Modal>
    </NewComment>
  );
};

export default CommentsList;
