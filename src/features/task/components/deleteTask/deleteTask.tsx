import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../../../redux/actions/task";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { ITaskReq } from "../../../../interfaces/task/taskType";
import { useSnackbar } from "notistack";
import { RootState } from "../../../../redux/store";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "10px",
};

const Form = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const TextTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const TextDescription = styled.div`
  font-size: 20px;
  font-weight: 100;
  margin-bottom: 15px;
`;

const StyleButton = styled.div`
  display: flex;
  gap: 15px;
`;

const DeleteTask: React.FC<{ task: ITaskReq }> = ({ task }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const handleOpen = () => {
    setOpen(true);
  };
  const message = useSelector((state: RootState) => state.task.error.message);
  const onDelete = async (id: number) => {
    enqueueSnackbar("Xoá công việc thành công", { variant: "success" });
    dispatch(deleteTask(id));
    handleClose();
  };
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button
        defaultValue={task.id}
        style={{
          marginRight: "10px",
          background: "#FFFFFF",
          color: "black",
          textTransform: "none",
        }}
        variant="contained"
        onClick={handleOpen}
      >
        Xoá
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form>
            <ErrorOutlineIcon
              sx={{ width: "100px", height: "100px", color: "#f8bb86" }}
            />
            <TextTitle>Are you sure?</TextTitle>
            <TextDescription>Delete task : {task.name} ?</TextDescription>
            <StyleButton>
              <Button
                variant="outlined"
                sx={{ color: "black" }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="outlined"
                sx={{ color: "black", background: "#7cd1f9" }}
                onClick={() => {
                  onDelete(task.id);
                }}
              >
                Yes
              </Button>
            </StyleButton>
          </Form>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteTask;
