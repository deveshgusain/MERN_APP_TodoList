import React from "react";
import { connect } from "react-redux";
import { requestTaskCreation } from "../store/mutations";
import { Link } from "react-router-dom";

export const TaskList = ({ tasks, name, id, ownerID, createNewTask }) => (
  <div className="card p-2 m-2">
    <h3>{name}</h3>
    <div>
      {tasks.map((task) => (
        <Link to={`/task/${task.id}`} key={task.id}>
          <div className="card p-2 mt-2">{task.name}</div>
        </Link>
      ))}
    </div>
    <button
      onClick={() => createNewTask(id, ownerID)}
      className="btn btn-primary btn-block mt-2"
    >
      Add New
    </button>
  </div>
);

function mapStateToProps(state, ownProps) {
  const groupID = ownProps.id;
  const ownerID = state.session.id;
  return {
    name: ownProps.name,
    ownerID,
    id: groupID,
    tasks: state.tasks.filter((task) => task.group === groupID),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    createNewTask(id, ownerID) {
      console.log("Creating new Task... ", id, " ", ownerID);
      dispatch(requestTaskCreation(id, ownerID));
    },
  };
}

export const ConnectedTaskList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskList);
