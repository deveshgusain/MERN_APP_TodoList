import React from "react";
import { connect } from "react-redux";
import { TaskList } from "./TaskList";
import { Link } from "react-router-dom";
import * as mutations from "../store/mutations";
import uuid from "uuid";

const TaskDetails = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskGroup,
  setTaskName,
  requestAddComment,
  ownerID,
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

    <div className="mt-3">
      {comments.map((comment) => (
        <p key={comment.id}>{comment.content}</p>
      ))}
    </div>

    <div>
      <form
        onSubmit={(e) => requestAddComment(e, ownerID)}
        className="form-inline"
      >
        <input
          type="text"
          placeholder="write comment here"
          name="comment"
          className="form-control"
        />
        <button type="submit" className="form-control btn btn-primary">
          Add Comment
        </button>
      </form>
    </div>

    <div>
      <Link to="/dashboard">
        <button className="btn btn-primary mt-2">Done</button>
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let task = state.tasks.find((task) => task.id === id);
  let comments = state.comments.filter((comment) => comment.task === id);
  let groups = state.groups;
  let ownerID = state.session.id;
  return {
    id,
    task,
    groups,
    comments,
    isComplete: task.isComplete,
    ownerID,
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
    requestAddComment(e, ownerID) {
      e.preventDefault();
      let content = e.target["comment"].value;
      let commentID = uuid();
      e.target["comment"].value = "";
      dispatch(mutations.addComment(id, ownerID, commentID, content));
    },
  };
};

export const ConnectedTaskDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskDetails);
