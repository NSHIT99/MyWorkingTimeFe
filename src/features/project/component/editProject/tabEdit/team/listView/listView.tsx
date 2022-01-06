import {
    Avatar,
  } from "@mui/material";
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
            <StyledBranchOne>HN</StyledBranchOne>
          ) : user.branch === 1 ? (
            <StyledBranchTwo>ĐN</StyledBranchTwo>
          ) : user.branch === 2 ? (
            <StyledBranchThree>HCM</StyledBranchThree>
          ) : (
            <StyledBranchFour>Vinh</StyledBranchFour>
          )}
          {user.type === 0 ? (
            <StyledBranchOne>Staff</StyledBranchOne>
          ) : user.type === 1 ? (
            <StyledBranchTwo>Internship</StyledBranchTwo>
          ) : user.type === 2 ? (
            <StyledBranchThree>Collaborator</StyledBranchThree>
          ) : null}
        </View>
      </Wrapper>
    );
  };
  
  export default ListView;
  