import React from "react";
import { connect } from "react-redux";
import { TaskList } from "./TaskList";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";

const TaskDetails = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskGroup,
  setTaskName,
}) => (
  <div className="card p-3 col-6">
    <div>
      <input
        value={task.name}
        onChange={setTaskName}
        className="form-control form-control-lg"
      />
    </div>
    <div>
      <button
        className="btn btn-primary mt-2"
        onClick={() => setTaskCompletion(id, !isComplete)}
      >
        {isComplete ? `ReOpen` : `Complete`}
      </button>
    </div>
    <div className="mt-3">
      <select
        className="form-control"
        onChange={setTaskGroup}
        value={task.group}
      >
        {groups.map((group) => (
          <option key={group.id} value={group.id}>
            {group.name}
          </option>
        ))}
      </select>
    </div>

    <Link to="/dashboard">
      <botton className="btn btn-primary mt-2"> Done</botton>
    </Link>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskName(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);
