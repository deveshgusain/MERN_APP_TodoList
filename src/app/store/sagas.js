import { put, take, select } from "redux-saga/effects";
import uuid from "uuid";
import axios from "axios";
import { history } from "./history";

import * as mutations from "./mutations";

const url = process.env.NODE_ENV == `production` ? "" : "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { groupID, ownerID } = yield take(mutations.REQUEST_TASK_CREATION);
    const taskID = uuid();
    yield put(mutations.createTask(taskID, groupID, ownerID));
    const { res } = yield axios.post(url + `/task/new`, {
      task: {
        id: taskID,
        group: groupID,
        owner: ownerID,
        isComplete: false,
        name: "New Task",
      },
    });
    console.info("Got Response, ", res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      mutations.SET_TASK_COMPLETE,
      mutations.SET_TASK_GROUP,
      mutations.SET_TASK_NAME,
    ]);
    yield axios.post(url + `/task/update`, {
      task: {
        id: task.taskID,
        name: task.name,
        group: task.group,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* addingCommentSaga() {
  while (true) {
    const { taskID, ownerID, commentID, content } = yield take(
      mutations.ADD_COMMENT
    );
    const { res } = yield axios.post(url + `/comment/new`, {
      comment: {
        task: taskID,
        owner: ownerID,
        content,
        id: commentID,
      },
    });
    console.info("Got Response ", res);
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      mutations.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password,
      });
      if (!data) {
        throw new Error();
      }
      console.log("Authenticated ", data);

      yield put(mutations.setState(data.state));
      yield put(mutations.processingAuthenticateUser(mutations.AUTHENTICATED));

      history.push("/dashboard");
    } catch (e) {
      console.log("can't authenticate");
      yield put(
        mutations.processingAuthenticateUser(mutations.NOT_AUTHENTICATED)
      );
    }
  }
}

export function* createUserSaga() {
  while (true) {
    const { username, password } = yield take(mutations.CREATE_USER);
    try {
      const { data } = yield axios.post(url + `/user/new`, {
        username,
        password,
      });
      console.log("Created ", data);
      yield put(mutations.setState(data.state));
      yield put(mutations.processingAuthenticateUser(mutations.AUTHENTICATED));
      history.push("/dashboard");
    } catch (e) {
      console.error("Error ", e);
      yield put(
        mutations.processingAuthenticateUser(mutations.USERNAME_RESERVED)
      );
    }
  }
}
