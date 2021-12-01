import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AddIcon from "@mui/icons-material/Add";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import styled from "styled-components";
import { Link } from "react-router-dom";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeAccessToken } from "../../utils/localStorageService";
import { useHistory } from "react-router-dom";
import logosidebar from "../../asset/img/logosidebar.png";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import logo from "../../asset/img/logo.png";
import { useDispatch } from "react-redux";

const SidebarContainer = styled.div`
  width: 350px;
  height: 100%;
  position: fixed;
  margin-top: 70px;
  background-color: #fff;
`;

const User = styled.div`
  background-image: url(${logosidebar});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 15px 25px 0;
`;

const User_info = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    padding-right: 10px;
  }
`;

const Logout = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
`;

const ButtonLogout = styled.div`
  display: flex;
  gap: 5px;
  background: #fff;
  border: 1px solid;
  padding: 5px;
  position: absolute;
  margin: 15px;
  z-index: 1;
  border-radius: 5px;
  :hover {
    background: #e9e9e9;
  }
`;

const Title = styled.div`
  color: #fff;
  font-size: 14px;
`;

const StyleLink = styled(Link)`
  color: #000000;
  text-decoration: none;
`;

const FooterSideBar = styled.div`
  position: absolute;
  height: 100px;
  bottom: 70px;
  background: #fff;
  width: 100%;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TitleFooter = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 30px;
`;

const SideBar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const [btn, setBtn] = React.useState(false);

  const handleClickBtn = () => {
    setBtn((prev) => !prev);
  };

  const history = useHistory();
  const handleclickLogout = () => {
    removeAccessToken();
    history.push("/account/login");
  };

  const dispatch = useDispatch()
  return (
    <SidebarContainer>
      <User>
        <User_info>
          <Info>
            <img src={`${logo}`} />
            <div>
              <Title>ADMIN ADMIN</Title>
              <Title>ADMINnnnnnn@nccsoft.com</Title>
            </div>
          </Info>
        </User_info>
        <Logout>
          <div onClick={handleClickBtn}>
            <KeyboardArrowDownIcon />
          </div>
          {btn ? (
            <ButtonLogout onClick={handleclickLogout}>
              <LogoutIcon />
              Logout
            </ButtonLogout>
          ) : null}
        </Logout>
      </User>
      <List
        sx={{ width: "100%", bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
          ></ListSubheader>
        }
      >
        <StyleLink to="/app/home">
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home Page" />
          </ListItemButton>
        </StyleLink>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <GroupWorkIcon />
          </ListItemIcon>
          <ListItemText primary="Admin" />
          {open ? <AddIcon /> : <AddIcon />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <StyleLink to="/app/main/user">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </StyleLink>
            <StyleLink to="/app/main/role">
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Roles" />
              </ListItemButton>
            </StyleLink>
          </List>
        </Collapse>
        <StyleLink to="/app/main/task">
          <ListItemButton>
            <ListItemIcon>
              <ImportContactsIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
        </StyleLink>
        <StyleLink to="/app/main/project">
          <ListItemButton>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </StyleLink>
      </List>
      <FooterSideBar>
        <TitleFooter>
          @2021 <span style={{ color: "red" }}>MyWorkingTime</span>
        </TitleFooter>
        <TitleFooter>
          <span style={{ fontWeight: "bold" }}>Programmer: </span> Nguyen Sinh
          Hai
        </TitleFooter>
      </FooterSideBar>
    </SidebarContainer>
  );
};

export default SideBar;
