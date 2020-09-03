import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Navigation = ({ username }) => {
  let welcome = username ? `Welcome, ${username}!` : "";
  return (
    <nav>
      <Link to="/dashboard" style={{ fontSize: "35px" }}>
        Daily Organizer
      </Link>
      <h3>{welcome}</h3>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    username: state.user.name,
  };
};

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);
