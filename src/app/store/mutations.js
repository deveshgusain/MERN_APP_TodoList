export const REQUEST_TASK_CREATION = "REQUEST_TASK_CREATION";
export const CREATE_TASK = "CREATE_TASK";
export const SET_TASK_COMPLETE = "SET_TASK_COMPLETE";
export const SET_TASK_GROUP = "SET_TASK_GROUP";
export const SET_TASK_NAME = "SET_TASK_NAME";
export const REQUEST_AUTHENTICATE_USER = "REQUEST_AUTHENTICATE_USER";
export const PROCESSING_AUTHENTICATE_USER = "PROCESSING_AUTHENTICATE_USER";
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATED = "AUTHENTICATED";
export const NOT_AUTHENTICATED = "NOT_AUTHENTICATED";
export const USERNAME_RESERVED = "USERNAME_RESERVED";
export const SET_STATE = "SET_STATE";
export const ADD_COMMENT = "ADD_COMMENT";
export const CREATE_USER = "CREATE_USER";

export const requestTaskCreation = (groupID, ownerID) => ({
  type: REQUEST_TASK_CREATION,
  groupID,
  ownerID,
});

export const createTask = (taskID, groupID, ownerId) => ({
  type: CREATE_TASK,
  taskID,
  groupID,
  ownerId,
});

export const setTaskCompletion = (id, isComplete) => ({
  type: SET_TASK_COMPLETE,
  taskID: id,
  isComplete,
});

export const setTaskGroup = (id, group) => ({
  type: SET_TASK_GROUP,
  taskID: id,
  group,
});

export const setTaskName = (id, name) => ({
  type: SET_TASK_NAME,
  taskID: id,
  name,
});

export const requestAuthenticateUser = (username, password) => ({
  type: REQUEST_AUTHENTICATE_USER,
  username,
  password,
});

export const processingAuthenticateUser = (
  status = AUTHENTICATING,
  session = null
) => ({
  type: PROCESSING_AUTHENTICATE_USER,
  session,
  authenticated: status,
});

export const setState = (state = {}) => ({
  type: SET_STATE,
  state,
});

export const addComment = (taskID, ownerID, commentID, content) => ({
  type: ADD_COMMENT,
  taskID,
  ownerID,
  commentID,
  content,
});

export const createUser = (username, password) => ({
  type: CREATE_USER,
  username,
  password,
});
