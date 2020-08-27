import React from "react";
import { connect } from "react-redux";
import { ConnectedTaskList, TaskList } from "./TaskList";

export const DashBoard = ({ groups }) => (
  <div>
    <h2>DashBoard</h2>
    {groups.map((group) => (
      <div>
        <ConnectedTaskList id={group.id} name={group.name} />
      </div>
    ))}
  </div>
);

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export const ConnectedDashBoard = connect(mapStateToProps)(DashBoard);
