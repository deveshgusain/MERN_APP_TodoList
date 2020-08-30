import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = () => (
  <div>
    <Link to="/dashboard">My Application</Link>
  </div>
);

export const ConnectedNavigation = connect((state) => state)(Navigation);
