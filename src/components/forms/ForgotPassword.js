import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  forgetPasswordRequest,
  userSelector,
} from "../../features/user/userSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const changeEmail = (e) => setEmail(e.target.value);

  const dispatch = useDispatch();
  const { error, forgetpassword, status } = useSelector(userSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgetPasswordRequest({ email }));
  };
  return (
    <div className="form">
      <div className="login">
        <h1>Reset your password</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="field-wrap">
            <label className={`${email ? "active" : ""}`}>
              Email Address<span className="req">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={changeEmail}
              required
              autoComplete="off"
            />
          </div>
          <p className="forgot">
            <Link to="/">Back To Login</Link>
          </p>
          {forgetpassword && <p style={{ color: "green" }}>{forgetpassword}</p>}
          <button className="button button-block" disabled={!email}>
            {status === "loading" ? "processing" : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
