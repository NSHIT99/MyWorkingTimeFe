import React from "react";
import styled from "styled-components";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Checkbox } from "@mui/material";
import { red } from "@mui/material/colors";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../redux/store";
import HeaderTeam from "./headerTeam/headerTeam";
import ListView from "./listView/listView";
import ListBranch from "./listBranch/listBranch";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid lightgray;
`;
const Container = styled.div`
  margin-top: 20px;
  padding-bottom: 10px;
`;
const Block = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px;
`;
const LeftHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const StyledCheckBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const RightHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;
const Text = styled.div`
  font-size: 16px;
  font-weight: 700;
`;
const TextView = styled.div`
  font-size: 15px;
`;
const Team: React.FC = () => {
  const users = useSelector((state: RootState) => state.project.filteredUsers);
  const members = useSelector(
    (state: RootState) => state.project.selectedMembers
  );

  const [openShowMember, setOpenShowMember] = React.useState(true);
  const [openSelectMember, setOpenSelectMember] = React.useState(true);
  const handleClickShowMember = () => {
    setOpenShowMember(!openShowMember);
  };
  const handleClickSelectMember = () => {
    setOpenSelectMember(!openSelectMember);
  };
  return (
      <div>
        <Header>
          <Block>
            <LeftHeader>
              <Text>Team</Text>
              <StyledCheckBox>
                <Checkbox
                  sx={{
                    color: red[800],
                    "&.Mui-checked": {
                      color: red[600],
                    },
                  }}
                />
                <Text>Show deactive member</Text>
              </StyledCheckBox>
            </LeftHeader>
            <RightHeader onClick={handleClickShowMember}>
              <Text>Member Type</Text>
              {openShowMember ? <ExpandLess /> : <ExpandMore />}
            </RightHeader>
          </Block>
          <Collapse in={openShowMember} timeout="auto" unmountOnExit>
            {members.map((member) => {
              return <HeaderTeam key={member.id} selectedMember={member} />;
            })}
          </Collapse>
        </Header>
        <Container>
          <Block>
            <LeftHeader>
              <TextView>Select team member</TextView>
            </LeftHeader>
            <RightHeader onClick={handleClickSelectMember}>
              {openSelectMember ? <ExpandLess /> : <ExpandMore />}
            </RightHeader>
          </Block>
          <Collapse in={openSelectMember} timeout="auto" unmountOnExit>
            <div>
              <ListBranch />
              {users.map((item) => {
                return <ListView user={item} />;
              })}
            </div>
          </Collapse>
        </Container>
      </div>
  );
};

export default Team;
