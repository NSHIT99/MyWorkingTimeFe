import React, { useEffect, useState } from "react";
import { Button, MenuItem, Modal } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";
import styled from "styled-components";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";
import { activeProject, getProject, inactiveProject } from "../../../../../redux/actions/project";
import { resetProgress } from "../../../../../redux/reducer/projectReducer";
import { RootState } from "../../../../../redux/store";
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
const ActionActive: React.FC<{ project: IProjectReq }> = ({ project }) => {
  const dispatch = useDispatch();
  const progress = useSelector((state: RootState) => state.project.progress);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const { enqueueSnackbar } = useSnackbar();
  const handleClickVariantAndActive =
    (variant: VariantType, id: number) => () => {
      dispatch(activeProject({ id }));
      enqueueSnackbar("Active project successfully", {
        variant,
      });
      dispatch(getProject({ status: 1 }));
    };
  const handleClickVariantAndInActive =
    (variant: VariantType, id: number) => () => {
      dispatch(inactiveProject({ id }));
      enqueueSnackbar("InActive project successfully", {
        variant,
      });
      dispatch(getProject({ status: 0 }));
    };
  useEffect(() => {
    if (progress === "done") {
      dispatch(resetProgress());
      setOpen(false);
    }
  }, [progress, dispatch]);
  return (
    <>
      {project.status === 0 ? (
        <>
          <MenuItem disableRipple onClick={handleOpen}>
            <ClearIcon />
            DeActive
          </MenuItem>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form>
                <ErrorOutlineIcon
                  sx={{ color: "#f8bb86", fontSize: "100px" }}
                />
                <TextTitle>Are you sure?</TextTitle>
                <TextDescription>
                  DeActive project : '{project.name}' ?
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
                    onClick={handleClickVariantAndInActive(
                      "success",
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
      ) : (
        <>
          <MenuItem disableRipple onClick={handleOpen}>
            <CheckIcon />
            Active
          </MenuItem>
          <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Form>
                <ErrorOutlineIcon
                  sx={{ color: "#f8bb86", fontSize: "100px" }}
                />
                <TextTitle>Are you sure?</TextTitle>
                <TextDescription>
                  Active project : '{project.name}' ?
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
                    onClick={handleClickVariantAndActive("success", project.id)}
                  >
                    Yes
                  </Button>
                </StyleButton>
              </Form>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

const ActiveAndInactive: React.FC<{ project: IProjectReq }> = ({ project }) => {
  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={1500}>
      <ActionActive project={project} />
    </SnackbarProvider>
  );
};

export default ActiveAndInactive;
