import {
    Avatar,
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
  } from "@mui/material";
  import React, { useState } from "react";
  import styled from "styled-components";
  import ClearIcon from "@mui/icons-material/Clear";
  import { useDispatch } from "react-redux";
  import { removeMember, updateMemberType } from "../../../../../../../redux/reducer/projectReducer";
import { IUserNotPagging } from "../../../../../../../interfaces/user/userType";
  
  const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-top: 15px;
  `;
  const LeftViewHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  `;
  const ViewMember = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  `;
  const TextView = styled.div`
    font-size: 15px;
  `;
  const StyledBranchOne = styled.div`
    font-weight: 600;
    background: #f44336;
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  
  const StyledBranchTwo = styled.div`
    font-weight: 600;
    background: #4caf50;
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  
  const StyledBranchThree = styled.div`
    padding: 2px 5px;
    font-size: 10px;
    border-radius: 10px;
    background: #2196f3;
    color: #fff;
    font-weight: 600;
  `;
  
  const StyledBranchFour = styled.div`
    font-weight: 600;
    background: #ff9800;
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelIntern0 = styled.div`
    font-weight: 600;
    background-color: rgb(178, 190, 181);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelIntern1 = styled.div`
    font-weight: 600;
    background-color: rgb(143, 151, 121);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelIntern2 = styled.div`
    font-weight: 600;
    background-color: rgb(102, 93, 30);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelPrefresher0 = styled.div`
    font-weight: 600;
    background-color: rgb(119, 119, 119);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelFresher1 = styled.div`
    font-weight: 600;
    background-color: rgb(33, 150, 243);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelFresher2 = styled.div`
    font-weight: 600;
    background-color: rgb(137, 207, 240);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelFresher3 = styled.div`
    font-weight: 600;
    background-color: rgb(49, 140, 231);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelJunior0 = styled.div`
    font-weight: 600;
    background-color: rgb(191, 175, 178);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelJunior1 = styled.div`
    font-weight: 600;
    background-color: rgb(165, 113, 100);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelJunior2 = styled.div`
    font-weight: 600;
    background-color: rgb(59, 47, 47);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelMiddle0 = styled.div`
    font-weight: 600;
    background-color: rgb(164, 198, 57);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelMiddle1 = styled.div`
    font-weight: 600;
    background-color: rgb(141, 182, 0);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelMiddle2 = styled.div`
    font-weight: 600;
    background-color: rgb(0, 128, 0);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelSenior0 = styled.div`
    font-weight: 600;
    background-color: rgb(241, 156, 187);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelSenior1 = styled.div`
    font-weight: 600;
    background-color: rgb(171, 39, 79);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const StyledLevelSenior2 = styled.div`
    font-weight: 600;
    background-color: rgb(229, 43, 80);
    color: #fff;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 10px;
  `;
  const HeaderTeam: React.FC<{
    selectedMember: IUserNotPagging;
  }> = ({ selectedMember}) => {
    const [memberType, setMemberType] = useState<string>("1");
    const dispatch = useDispatch();
    const handleChangeMemberType = (event: SelectChangeEvent) => {
      setMemberType(event.target.value);
      dispatch(updateMemberType({...selectedMember, type: parseInt(event.target.value)}));
    };
    const handleRemoveMember = (user: IUserNotPagging) => {
      dispatch(removeMember(user));
    };
    return (
      <Wrapper>
        <LeftViewHeader>
          <ClearIcon onClick={() => handleRemoveMember(selectedMember)} />
          <ViewMember>
            <Avatar
              src={`http://dev.timesheetapi.nccsoft.vn/${selectedMember.avatarPath}`}
            />
            <TextView>{selectedMember.name}</TextView>
            {selectedMember.branch === 0 ? (
              <StyledBranchOne>HN</StyledBranchOne>
            ) : selectedMember.branch === 1 ? (
              <StyledBranchTwo>ĐN</StyledBranchTwo>
            ) : selectedMember.branch === 2 ? (
              <StyledBranchThree>HCM</StyledBranchThree>
            ) : (
              <StyledBranchFour>Vinh</StyledBranchFour>
            )}
            {selectedMember.type === 0 ? (
              <StyledBranchOne>Staff</StyledBranchOne>
            ) : selectedMember.type === 1 ? (
              <StyledBranchTwo>Internship</StyledBranchTwo>
            ) : selectedMember.type === 2 ? (
              <StyledBranchThree>Collaborator</StyledBranchThree>
            ) : null}
            {selectedMember.level === 0 ? (
              <StyledLevelIntern0>Intern_0</StyledLevelIntern0>
            ) : selectedMember.level === 1 ? (
              <StyledLevelIntern1>Intern_1</StyledLevelIntern1>
            ) : selectedMember.level === 2 ? (
              <StyledLevelIntern2>Intern_2</StyledLevelIntern2>
            ) : selectedMember.level === 3 ? (
              <StyledLevelPrefresher0>Prefresher</StyledLevelPrefresher0>
            ) : selectedMember.level === 4 ? (
              <StyledLevelFresher1>Fresher-</StyledLevelFresher1>
            ) : selectedMember.level === 5 ? (
              <StyledLevelFresher2>Fresher+</StyledLevelFresher2>
            ) : selectedMember.level === 6 ? (
              <StyledLevelFresher3>Fresher+</StyledLevelFresher3>
            ) : selectedMember.level === 7 ? (
              <StyledLevelJunior0>Junior-</StyledLevelJunior0>
            ) : selectedMember.level === 8 ? (
              <StyledLevelJunior1>Junior</StyledLevelJunior1>
            ) : selectedMember.level === 9 ? (
              <StyledLevelJunior2>Junior+</StyledLevelJunior2>
            ) : selectedMember.level === 10 ? (
              <StyledLevelMiddle0>Middle-</StyledLevelMiddle0>
            ) : selectedMember.level === 11 ? (
              <StyledLevelMiddle1>Middle</StyledLevelMiddle1>
            ) : selectedMember.level === 12 ? (
              <StyledLevelMiddle2>Middle+</StyledLevelMiddle2>
            ) : selectedMember.level === 13 ? (
              <StyledLevelSenior0>Senior-</StyledLevelSenior0>
            ) : selectedMember.level === 14 ? (
              <StyledLevelSenior1>Senior</StyledLevelSenior1>
            ) : selectedMember.level === 15 ? (
              <StyledLevelSenior2>Senior+</StyledLevelSenior2>
            ) : null}
          </ViewMember>
        </LeftViewHeader>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
          <Select
            id="demo-simple-select"
            value={memberType}
            onChange={handleChangeMemberType}
          >
            <MenuItem value={0}>Member</MenuItem>
            <MenuItem value={1}>Project Manager</MenuItem>
            <MenuItem value={2}>Shadow</MenuItem>
            <MenuItem value={3}>Deactive</MenuItem>
          </Select>
        </FormControl>
      </Wrapper>
    );
  };
  
  export default HeaderTeam;
  