import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ConnectedDashBoard } from "./dashboard";

export const Main = () => (
  <Provider store={store}>
    <div>
      <ConnectedDashBoard />
    </div>
  </Provider>
);
