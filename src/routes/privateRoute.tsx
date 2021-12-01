import { Route, Redirect } from "react-router-dom";
import { getAccessToken } from "../utils/localStorageService";
import React from "react";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const accessToken = getAccessToken();
  return accessToken ? (
    <Route path={props.path} component={props.component} exact={props.exact} />
  ) : (
    <Redirect to="/account/login" />
  );
};

export default PrivateRoute;
