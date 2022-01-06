import { Avatar } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { pushMember } from "../../../../../../../redux/reducer/projectReducer";
import { IUserNotPagging } from "../../../../../../../interfaces/user/userType";

const Wrapper = styled.div`
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-top: 15px;
  align-items: center;
`;
const View = styled.div`
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

const ListView: React.FC<{ user: IUserNotPagging }> = ({ user }) => {
  const dispatch = useDispatch();
  const handlePushMember = (user: IUserNotPagging) => {
    dispatch(pushMember(user));
  };
  return (
    <Wrapper>
      <AddCircleOutlineIcon
        sx={{ marginLeft: "20px" }}
        onClick={() => handlePushMember(user)}
      />
      <View>
        <TextView>{user.fullName}</TextView>
        {user.branch === 0 ? (
          <StyledBranchOne>None</StyledBranchOne>
        ) : user.branch === 1 ? (
          <StyledBranchTwo>58K1</StyledBranchTwo>
        ) : user.branch === 2 ? (
          <StyledBranchThree>58K2</StyledBranchThree>
        ) : user.branch === 3 ? (
          <StyledBranchFour>58K3</StyledBranchFour>
        ) : user.branch === 4 ? (
          <StyledBranchFive>58K4</StyledBranchFive>
        ) : user.branch === 5 ? (
          <StyledBranchSix>59K1</StyledBranchSix>
        ) : user.branch === 6 ? (
          <StyledBranchSeven>59K2</StyledBranchSeven>
        ) : user.branch === 7 ? (
          <StyledBranchEight>59K3</StyledBranchEight>
        ) : user.branch === 8 ? (
          <StyledBranchNight>59K4</StyledBranchNight>
        ) : user.branch === 9 ? (
          <StyledBranchTen>60K1</StyledBranchTen>
        ) : user.branch === 10 ? (
          <StyledBranchEleven>60K2</StyledBranchEleven>
        ) : user.branch === 11 ? (
          <StyledBranchTwelve>60K3</StyledBranchTwelve>
        ) : user.branch === 12 ? (
          <StyledBranchThirteen>60K4</StyledBranchThirteen>
        ) : user.branch === 13 ? (
          <StyledBranchfourteen>61K1</StyledBranchfourteen>
        ) : user.branch === 14 ? (
          <StyledBranchFiveteen>61K2</StyledBranchFiveteen>
        ) : user.branch === 15 ? (
          <StyledBranchSixteen>61K3</StyledBranchSixteen>
        ) : (
          <StyledBranchSeventeen>61K4</StyledBranchSeventeen>
        )}
        {user.type === 0 ? (
          <StyledTypeOne>Nhóm trưởng</StyledTypeOne>
        ) : user.type === 1 ? (
          <StyledTypeTwo>Giáo viên phụ trách</StyledTypeTwo>
        ) : user.type === 2 ? (
          <StyledTypeThree>Thành viên</StyledTypeThree>
        ) : null}
      </View>
    </Wrapper>
  );
};

export default ListView;
