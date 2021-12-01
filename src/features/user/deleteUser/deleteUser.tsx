import React, { useEffect, useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { IGetAllReq } from "../../../interfaces/user/userType";
import { RootState } from "../../../redux/store";
import { resetUserProgress  as resetProgress } from "../../../redux/reducer/userRuducer";
import { deleteUserActions } from "../../../redux/actions/user";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  p: 4,
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
  font-size: 15px;
  font-weight: 400;
  margin-bottom: 15px;
`;

const StyleButton = styled.div`
  display: flex;
  gap: 15px;
`;
const ActionDeleteUser: React.FC<{ user: IGetAllReq }> = ({ user }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const progress = useSelector((state: RootState) => state.user.progress);

  useEffect(() => {
    if (progress === "done") {
      dispatch(resetProgress());
      setOpen(false);
    }
  }, [progress, dispatch]);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant: VariantType, id: number) => () => {
    dispatch(deleteUserActions(id));
    enqueueSnackbar(
        "Delete Role SuccessFully",
      {
        variant,
      }
    );
  };
  return (
    <>
      <MenuItem disableRipple onClick={handleOpen}>
        <DeleteIcon style={{color: "red"}} />
        <p style={{ color: "red" }}>Delete</p>
      </MenuItem>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form>
            <ErrorOutlineIcon sx={{ color: "#f8bb86", fontSize: "100px" }} />
            <TextTitle>Are you sure?</TextTitle>
            <TextDescription>
              Delete project : '{user.name}' ?
            </TextDescription>
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
                onClick={handleClickVariant(
                   "success",
                  user.id
                )}
              >
                Yes
              </Button>
            </StyleButton>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export const DeleteUser: React.FC<{ user: IGetAllReq }> = ({ user }) => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
      <ActionDeleteUser user={user} />
    </SnackbarProvider>
  );
};
