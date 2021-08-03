import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, userSelector } from "../../features/user/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const dispatch = useDispatch();
  const { error, user, status } = useSelector(userSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password,
      })
    );
  };

  return (
    <div>
      <div className="login">
        <h1>Welcome Back!</h1>
        {user ? (
          <Redirect to="/home" />
        ) : (
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
              />
            </div>

            <div className="field-wrap">
              <label className={`${password ? "active" : ""}`}>
                Password<span className="req">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={changePassword}
                required
              />
            </div>

            <p className="forgot">
              <Link to="/forgot-password">Forgot Password?</Link>
            </p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              className="button button-block"
              disabled={!email || !password}
            >
              {status === "loading" ? "processing" : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
