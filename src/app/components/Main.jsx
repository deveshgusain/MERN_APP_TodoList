import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashBoard } from "./dashboard";
import { ConnectedLogin } from "./Login";
import { Router, Route } from "react-router-dom";
import { history } from "../store/history";
import { ConnectedNavigation } from "./Navigation";
import { ConnectedTaskDetails } from "./TaskDetails";
import { Redirect } from "react-router";

const RouteGuard = (Component) => ({ match }) => {
  console.info("Route guard ", match);
  if (!store.getState().session.authenticated) {
    return <Redirect to="/" />;
  }
  {
    return <Component match={match} />;
  }
};

export const Main = () => (
  <Router history={history}>
    <Provider store={store}>
      <div>
        {/* <ConnectedDashBoard /> */}
        <ConnectedNavigation />
        <Route exact path="/" component={ConnectedLogin}></Route>
        <Route
          exact
          path="/dashboard"
          render={RouteGuard(ConnectedDashBoard)}
        />
        <Route
          exact
          path="/task/:id"
          render={RouteGuard(ConnectedTaskDetails)}
        />
      </div>
    </Provider>
  </Router>
);
