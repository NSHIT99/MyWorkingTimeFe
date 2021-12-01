import React from "react";
import styled from "styled-components";
import notfound from "../../asset/img/notfound.jpg";

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const ImgNotFound = styled.img`
  width: 200px;
  height: 200px;
`;

const Title = styled.div`
  font-size: 26px;
  color: red;
`;

const NotFound: React.FC = () => {
  return (
    <Content>
      <img src={notfound} />
      <Title>Trang này không có sẵn. Mong bạn thông cảm.</Title>
      <Title>Bạn thử tìm cụm từ khác xem sao nhé.</Title>
    </Content>
  );
};

export default NotFound;
