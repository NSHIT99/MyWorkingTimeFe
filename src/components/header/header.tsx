import React, { useState } from "react";
import styled from "styled-components";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Modal, Tab } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { Colors } from "./color";
import logo from "../../asset/img/logo.png";
import logosidebar from "../../asset/img/logosidebar.png";

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
  padding-left: 25px;
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
            <TabPanel value="2">SETTINGS</TabPanel>
          </TabContext>
        </StyleBox>
      </Modal>
    </Container>
  );
};

export default Header;
