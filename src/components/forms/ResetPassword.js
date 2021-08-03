import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPasswordRequest,
  userSelector,
} from "../../features/user/userSlice";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const changePassword = (e) => setPassword(e.target.value);

  const dispatch = useDispatch();
  const { error, resetpassword, status } = useSelector(userSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPasswordRequest({
        password,
      })
    );
  };

  return (
    <div className="form">
      <div className="login">
        <h1>Create a new password</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field-wrap">
            <label className={`${password ? "active" : ""}`}>
              New Password<span className="req">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={changePassword}
              required
              autoComplete="off"
            />
          </div>
          <p className="forgot">
            <Link to="/">Back To Login</Link>
          </p>
          {resetpassword && <p style={{ color: "green" }}>{resetpassword}</p>}
          <button className="button button-block" disabled={!password}>
            {status === "loading" ? "processing" : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
