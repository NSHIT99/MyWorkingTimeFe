import React, { useEffect, useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/system";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { RootState } from "../../../redux/store";
import { resetProgress } from "../../../redux/reducer/roleReducer";
import { deleteRoleActions } from "../../../redux/actions/role";
import { IRoleReq } from "../../../interfaces/role/roleType";

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

const TitleActions = styled.p`
  margin: 0;
  color: red;
`;

export const DeleteRole: React.FC<{ role: IRoleReq }> = ({ role }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const progress = useSelector((state: RootState) => state.role.progress);
  const message = useSelector((state: RootState) => state.role.error.message);

  useEffect(() => {
    if (progress === "done") {
      enqueueSnackbar("Sửa vai trò thành công", { variant: "success" });
      dispatch(resetProgress());
      setOpen(false);
    } else if (progress === "error" && message) {
      enqueueSnackbar(message, { variant: "error" });
    }
  }, [progress,, dispatch]);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant: VariantType, id: number) => () => {
    dispatch(deleteRoleActions(id));
    enqueueSnackbar(
        "Xoá vai trò thành công",
      {
        variant,
      }
    );
  };
  return (
    <>
      <MenuItem disableRipple onClick={handleOpen}>
        <DeleteIcon style={{color: "red"}} />
        <TitleActions>Delete</TitleActions>
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
              Xoá vai trò : '{role.name}' ?
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
                  role.id
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
