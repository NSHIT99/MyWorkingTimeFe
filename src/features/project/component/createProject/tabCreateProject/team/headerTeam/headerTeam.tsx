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

const StyledTypeOne = styled.div`
  font-weight: 600;
  background: #f44336;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledTypeTwo = styled.div`
  font-weight: 600;
  background: #4caf50;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledTypeThree = styled.div`
  padding: 2px 5px;
  font-size: 10px;
  border-radius: 10px;
  background: #2196f3;
  color: #fff;
  font-weight: 600;
`;

const StyledTypeFour = styled.div`
  font-weight: 600;
  background: #ff9800;
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchOne = styled.div`
  font-weight: 600;
  background-color: rgb(228, 15, 15);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchTwo = styled.div`
  font-weight: 600;
  background-color: rgb(166, 226, 2);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchThree = styled.div`
  padding: 2px 5px;
  font-size: 10px;
  border-radius: 10px;
  background-color: rgb(102, 93, 30);
  color: #fff;
  font-weight: 600;
`;

const StyledBranchFour = styled.div`
  font-weight: 600;
  background-color: rgb(119, 119, 119);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchFive = styled.div`
  font-weight: 600;
  background-color: rgb(33, 150, 243);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchSix = styled.div`
  font-weight: 600;
  background-color: rgb(137, 207, 240);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchSeven = styled.div`
  font-weight: 600;
  background-color: rgb(49, 140, 231);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchEight = styled.div`
  font-weight: 600;
  background-color: rgb(191, 175, 178);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchNight = styled.div`
  font-weight: 600;
  background-color: rgb(165, 113, 100);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchTen = styled.div`
  font-weight: 600;
  background-color: rgb(59, 47, 47);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchEleven = styled.div`
  font-weight: 600;
  background-color: rgb(164, 198, 57);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchTwelve = styled.div`
  font-weight: 600;
  background-color: rgb(141, 182, 0);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchThirteen = styled.div`
  font-weight: 600;
  background-color: rgb(0, 128, 0);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchfourteen = styled.div`
  font-weight: 600;
  background-color: rgb(241, 156, 187);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchFiveteen = styled.div`
  font-weight: 600;
  background-color: rgb(171, 39, 79);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchSixteen = styled.div`
  font-weight: 600;
  background-color: rgb(229, 43, 80);
  color: #fff;
  font-size: 10px;
  padding: 2px 5px;
  border-radius: 10px;
`;

const StyledBranchSeventeen = styled.div`
  font-weight: 600;
  background-color: rgb(5, 32, 90);
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
          <TextView>{selectedMember.fullName}</TextView>
          {selectedMember.branch === 0 ? (
            <StyledBranchOne>None</StyledBranchOne>
            ) : selectedMember.branch === 1 ? (
              <StyledBranchTwo>58K1</StyledBranchTwo>
            ) : selectedMember.branch === 2 ? (
              <StyledBranchThree>58K2</StyledBranchThree>
            ) : selectedMember.branch === 3 ? (
              <StyledBranchFour>58K3</StyledBranchFour>
            ) : selectedMember.branch === 4 ? (
              <StyledBranchFive>58K4</StyledBranchFive>
            ) : selectedMember.branch === 5 ? (
              <StyledBranchSix>59K1</StyledBranchSix>
            ) : selectedMember.branch === 6 ? (
              <StyledBranchSeven>59K2</StyledBranchSeven>
            ) : selectedMember.branch === 7 ? (
              <StyledBranchEight>59K3</StyledBranchEight>
            ) : selectedMember.branch === 8 ? (
              <StyledBranchNight>59K4</StyledBranchNight>
            ) : selectedMember.branch === 9 ? (
              <StyledBranchTen>60K1</StyledBranchTen>
            ) : selectedMember.branch === 10 ? (
              <StyledBranchEleven>60K2</StyledBranchEleven>
            ) : selectedMember.branch === 11 ? (
              <StyledBranchTwelve>60K3</StyledBranchTwelve>
            ) : selectedMember.branch === 12 ? (
              <StyledBranchThirteen>60K4</StyledBranchThirteen>
            ) : selectedMember.branch === 13 ? (
              <StyledBranchfourteen>61K1</StyledBranchfourteen>
            ) : selectedMember.branch === 14 ? (
              <StyledBranchFiveteen>61K2</StyledBranchFiveteen>
            ) : selectedMember.branch === 15 ? (
              <StyledBranchSixteen>61K3</StyledBranchSixteen>
            ) : (
              <StyledBranchSeventeen>61K4</StyledBranchSeventeen>
            )}
          {selectedMember.type === 0 ? (
            <StyledTypeOne>Nhóm trưởng</StyledTypeOne>
          ) : selectedMember.type === 1 ? (
            <StyledTypeTwo>Giáo viên phụ trách</StyledTypeTwo>
          ) : selectedMember.type === 2 ? (
            <StyledTypeThree>Thành viên</StyledTypeThree>
          ) : null}
        </ViewMember>
      </LeftViewHeader>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 100 }}>
        <Select
          id="demo-simple-select"
          value={memberType}
          onChange={handleChangeMemberType}
        >
          <MenuItem value={0}>Sinh Viên</MenuItem>
          <MenuItem value={1}>Giảng viên</MenuItem>
          <MenuItem value={2}>Nhóm trưởng</MenuItem>
        </Select>
      </FormControl>
    </Wrapper>
  );
};

export default HeaderTeam;
