import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAccessToken } from "../utils/localStorageService";

const PublicRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const accessToken = getAccessToken();
  return !accessToken ? (
    <Route path={props.path} component={props.component} exact={props.exact} />
  ) : (
    <Redirect to="/app" />
  );
};

export default PublicRoute;
