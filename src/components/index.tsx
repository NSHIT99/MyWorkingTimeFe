import React from "react";
import styled from "styled-components";
import Header from "./header/header";
import MainView from "./mainView/mainView";
import SideBar from "./sidebar/sidebar";

const HomeView = styled.div``;

const MainContent = styled.div`
  display: flex;
`;

const HomePage: React.FC = () => {
  return (
    <HomeView>
      <Header />
      <MainContent>
        <SideBar />
        <MainView />
      </MainContent>
    </HomeView>
  );
};

export default HomePage;
