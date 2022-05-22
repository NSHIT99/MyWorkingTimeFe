import React, { useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Modal, Tab } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Colors } from "./color";
import logo from "../../asset/img/logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import {
  getRoleName,
  removeAccessToken,
  removeRoleName,
} from "../../utils/localStorageService";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import DateRangeIcon from "@mui/icons-material/DateRange";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import GroupIcon from "@mui/icons-material/Group";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import AddIcon from "@mui/icons-material/Add";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import logosidebar from "../../asset/img/logosidebar.png";
import CameraIcon from '@mui/icons-material/Camera';

const StyleLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const ItemText = styled(ListItemText)`
  color: #fff;
  text-decoration: none;
`;

const ButtonLogout = styled.div`
  display: flex;
  gap: 10px;
  background: #f45c5c;
  border: 1px solid;
  padding: 5px;
  position: absolute;
  margin: 15px;
  z-index: 1;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background: #ec1111;
  }
`;

const Container = styled.div`
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 999;
`;

const LeftBlock = styled.div`
  display: flex;
  align-items: center;
  padding-left: 10px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
`;

const Title = styled.div`
  margin-left: 10px;
  color: #fff;
  font-weight: 500;
  font-size: 26px;
`;

const RightBlock = styled.div`
  padding-right: 25px;
`;

const StyleBox = styled(Box)`
  position: absolute;
  top: 59.4%;
  left: 88.7%;
  transform: translate(-50%, -50%);
  width: 22.5%;
  height: 100vh;
  background-color: white;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
const StyleNav = styled.div`
  border-bottom: 1px solid #eee;
  padding: 10px;
`;
const BlockNav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;
const LeftBlockNav = styled.div`
  display: flex;
  width: 50%;
  gap: 10%;
  align-items: center;
`;
const TextLeftBlockNav = styled.p`
  white-space: nowrap;
  font-size: 15px;
`;

const RightBlockNav = styled.div``;
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(`url(${logosidebar})`);
  const [value, setValue] = useState("1");
  const [color, setColor] = useState(`url(${logosidebar})`);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleCheck = (key: string) => {
    setActive(key);
    setColor(key);
  };

  const history = useHistory();
  const handleclickLogout = () => {
    removeAccessToken();
    removeRoleName();
    history.push("/account/login");
  };

  const role = getRoleName();
  const [side, setSide] = React.useState(false);

  const handleClickSideBar = () => {
    setSide(!side);
  };

  return (
    <Container
      style={{
        background: `${color}`,
        backgroundSize: "cover",
      }}
    >
      <LeftBlock>
        <img src={logo} />
        <Title>MyWorkingTime</Title>
      </LeftBlock>
      {role === "Admin" ? (
        <List
          sx={{ display: "flex" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <StyleLink to="/app/home">
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Trang chủ" />
            </ListItemButton>
          </StyleLink>
          <ListItemButton onClick={handleClickSideBar}>
            <ListItemIcon>
              <GroupWorkIcon sx={{ color: "#fff" }} />
            </ListItemIcon>
            <ItemText primary="Quản trị" />
            {side ? (
              <AddIcon sx={{ color: "#fff" }} />
            ) : (
              <AddIcon sx={{ color: "#fff" }} />
            )}
          </ListItemButton>
          <Collapse in={side} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{ display: "flex", flexDirection: "row" }}
            >
              <StyleLink to="/app/main/user">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <GroupIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ItemText primary="Người dùng" />
                </ListItemButton>
              </StyleLink>
              <StyleLink to="/app/main/role">
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <LocalOfferIcon sx={{ color: "#fff" }} />
                  </ListItemIcon>
                  <ItemText primary="Vai trò" />
                </ListItemButton>
              </StyleLink>
            </List>
          </Collapse>
          <StyleLink to="/app/main/task">
            <ListItemButton>
              <ListItemIcon>
                <ImportContactsIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Công việc" />
            </ListItemButton>
          </StyleLink>
          <StyleLink to="/app/main/project">
            <ListItemButton>
              <ListItemIcon>
                <AssessmentIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Quản lý đồ án" />
            </ListItemButton>
          </StyleLink>
          <StyleLink to="/app/main/myworkingtime">
            <ListItemButton>
              <ListItemIcon>
                <AccessAlarmIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Quản lý thời gian" />
            </ListItemButton>
          </StyleLink>
          <StyleLink to="/app/main/workingtime">
            <ListItemButton>
              <ListItemIcon>
                <DateRangeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Xác thực" />
            </ListItemButton>
          </StyleLink>
          <StyleLink to="/app/main/statistical">
            <ListItemButton>
              <ListItemIcon>
                <CameraIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Thống kê" />
            </ListItemButton>
          </StyleLink>
        </List>
      ) : (
        <List
          sx={{ display: "flex" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          <StyleLink to="/app/home">
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Trang chủ" />
            </ListItemButton>
          </StyleLink>
          <StyleLink to="/app/main/myworkingtime">
            <ListItemButton>
              <ListItemIcon>
                <AccessAlarmIcon sx={{ color: "#fff" }} />
              </ListItemIcon>
              <ItemText primary="Quản lý thời gian" />
            </ListItemButton>
          </StyleLink>
        </List>
      )}
      <RightBlock>
        <MoreVertIcon style={{ color: "#fff" }} onClick={handleOpen} />
      </RightBlock>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyleBox>
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="SKINS" value="1" />
                <Tab label="SETTINGS" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1" sx={{ padding: "0" }}>
              {Colors.map((item, index) => (
                <StyleNav key={index}>
                  <BlockNav onClick={() => handleCheck(item.color)}>
                    <LeftBlockNav
                      style={{
                        display: "flex",
                        width: "50%",
                        gap: "10%",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          background: `${item.color}`,
                          width: "25%",
                          height: "30px",
                          borderRadius: "5px",
                        }}
                      ></div>
                      <TextLeftBlockNav
                        style={{ whiteSpace: "nowrap", fontSize: "15px" }}
                      >
                        {item.nameColor}
                      </TextLeftBlockNav>
                    </LeftBlockNav>
                    <RightBlockNav key={index}>
                      <CheckIcon
                        style={{
                          display: active === item.color ? "inline" : "none",
                        }}
                      />
                    </RightBlockNav>
                  </BlockNav>
                </StyleNav>
              ))}
            </TabPanel>
            <TabPanel value="2">
              <ButtonLogout onClick={handleclickLogout}>
                <LogoutIcon />
                Logout
              </ButtonLogout>
            </TabPanel>
          </TabContext>
        </StyleBox>
      </Modal>
    </Container>
  );
};

export default Header;
