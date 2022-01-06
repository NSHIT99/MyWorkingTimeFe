import React, { useEffect, useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject } from "../../../../../redux/actions/project";
import { RootState } from "../../../../../redux/store";
import { Box } from "@mui/system";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { resetProgress } from "../../../../../redux/reducer/projectReducer";
import { IProjectReq } from "../../../../../interfaces/project/projectType";

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

const ActionDelete: React.FC<{ project: IProjectReq }> = ({ project }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const error = useSelector((state: RootState) => state.project.error);
  const progress = useSelector((state: RootState) => state.project.progress);
  
  useEffect(() => {
    if (progress === "done") {
      dispatch(resetProgress());
      setOpen(false);
    }
  }, [progress, dispatch]);
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariant = (variant: VariantType, id: number) => () => {
    dispatch(deleteProject(id));
    enqueueSnackbar(
      error === null
        ? "Delete project success"
        : "MyTimesheet is exist, you cann't delete Project",
      {
        variant,
      }
    );
  };
  return (
    <>
      <MenuItem disableRipple onClick={handleOpen}>
        <DeleteIcon />
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
              Delete project : '{project.name}' ?
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
                  error === null ? "success" : "error",
                  project.id
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

const DeleteProject: React.FC<{ project: IProjectReq }> = ({ project }) => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
      <ActionDelete project={project} />
    </SnackbarProvider>
  );
};

export default DeleteProject;
