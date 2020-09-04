import React from "react";
import { connect } from "react-redux";
import * as mutations from "../store/mutations";

const Signup = ({ authenticated, createNewUser }) => {
  return (
    <div className="card p-3 col-6">
      <h3>Complete the following form to create a new account.</h3>

      <form onSubmit={createNewUser} className="mt-4">
        <label>
          <span>
            <b>User Name</b>
          </span>
          <input
            type="text"
            placeholder="username"
            name="username"
            className="form-control"
          />
        </label>

        <label>
          <span>
            <b>Password </b>
          </span>
          <input
            type="text"
            placeholder="password"
            name="password"
            className="form-control  "
          />
        </label>

        {authenticated == mutations.USERNAME_RESERVED ? (
          <p>A user by that name already exists.</p>
        ) : null}
        <button type="submit" className="form-control mt-2 btn btn-primary">
          Sign Up
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.session.authenticated,
});

const mapDispatchToProps = (dispatch) => ({
  createNewUser(e) {
    e.preventDefault();
    let username = e.target["username"].value;
    let password = e.target["password"].value;
    dispatch(mutations.createUser(username, password));
  },
});

export const ConnectedSignup = connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
