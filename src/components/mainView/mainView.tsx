import React from "react";
import styled from "styled-components";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import PrivateRoute from "../../routes/privateRoute";
import NotFound from "../notFound/notFound";
import Users from "../../features/user/user";
import Roles from "../../features/role/role";
import Tasks from "../../features/task/task";
import Projects from "../../features/project/project";
import MainHome from "../../features/mainHome/mainHome";
import Myworkingtime from "../../features/myworkingTime/myworkingtime";
import WorkingTime from "../../features/workingTime/workingtime";

const MainContent = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 70px;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  border: 30px solid #e9e9e9;
`;

const MainView: React.FC = () => {
  const { path } = useRouteMatch();
  return (
    <MainContent>
      <Content>
        <Switch>
          <Route exact path={path} component={NotFound}></Route>
          <PrivateRoute
            exact={false}
            path={`${path}/main/task`}
            component={Tasks}
          />
          <PrivateRoute
            exact={false}
            path={`${path}/main/user`}
            component={Users}
          />
          <PrivateRoute
            exact={false}
            path={`${path}/main/role`}
            component={Roles}
          />
          <PrivateRoute
            exact={false}
            path={`${path}/home`}
            component={MainHome}
          />
          <PrivateRoute
            exact={false}
            path={`${path}/main/project`}
            component={Projects}
          />
          <PrivateRoute
            exact={false}
            path={`${path}/main/myworkingtime`}
            component={Myworkingtime}
          />
           <PrivateRoute
            exact={false}
            path={`${path}/main/workingtime`}
            component={WorkingTime}
          />
        </Switch>
      </Content>
    </MainContent>
  );
};

export default MainView;
