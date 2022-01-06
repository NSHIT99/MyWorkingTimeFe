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
import {
  removeMember,
  updateMemberType,
} from "../../../../../../../redux/reducer/projectReducer";
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

const HeaderTeam: React.FC<{
  selectedMember: IUserNotPagging;
}> = ({ selectedMember }) => {
  const [memberType, setMemberType] = useState<string>("1");
  const dispatch = useDispatch();
  const handleChangeMemberType = (event: SelectChangeEvent) => {
    setMemberType(event.target.value);
    dispatch(
      updateMemberType({
        ...selectedMember,
        type: parseInt(event.target.value),
      })
    );
  };
  const handleRemoveMember = (user: IUserNotPagging) => {
    dispatch(removeMember(user));
  };
  return (
    <Wrapper>
      <LeftViewHeader>
        <ClearIcon onClick={() => handleRemoveMember(selectedMember)} />
        <ViewMember>
          <TextView>{selectedMember.fullName}</TextView>
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
