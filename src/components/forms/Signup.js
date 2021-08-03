import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userSelector } from "../../features/user/userSlice";

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeFirstname = (e) => setFirstname(e.target.value);
  const changeLastname = (e) => setLastname(e.target.value);
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);

  const dispatch = useDispatch();
  const { error, registeruser, status } = useSelector(userSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      registerUser({
        firstname,
        lastname,
        email,
        password,
      })
    );
  };
  return (
    <div>
      <div className="signup">
        <h1>Sign Up for Free</h1>

        <form onSubmit={handleSubmit}>
          <div className="top-row">
            <div className="field-wrap">
              <label className={`${firstname ? "active" : ""}`}>
                First Name<span className="req">*</span>
              </label>
              <input
                type="text"
                value={firstname}
                onChange={changeFirstname}
                required
                autoComplete="off"
              />
            </div>

            <div className="field-wrap">
              <label className={`${lastname ? "active" : ""}`}>
                Last Name<span className="req">*</span>
              </label>
              <input
                type="text"
                value={lastname}
                onChange={changeLastname}
                required
                autoComplete="off"
              />
            </div>
          </div>

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

          <div className="field-wrap">
            <label className={`${password ? "active" : ""}`}>
              Set A Password<span className="req">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={changePassword}
              required
              autoComplete="off"
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {registeruser && <p style={{ color: "green" }}>{registeruser}</p>}
          <button
            type="submit"
            className="button button-block"
            disabled={!email || !password || !firstname || !lastname}
          >
            {status === "loading" ? "processing" : "Get Started"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
