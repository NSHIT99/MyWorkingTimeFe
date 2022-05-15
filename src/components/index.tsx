import React from "react";
import styled from "styled-components";
import Header from "./header/header";
import MainView from "./mainView/mainView";

const HomeView = styled.div``;

const MainContent = styled.div`
  display: flex;
`;

const HomePage: React.FC = () => {
  return (
    <HomeView>
      <Header />
      <MainContent>
        <MainView />
      </MainContent>
    </HomeView>
  );
};

export default HomePage;
