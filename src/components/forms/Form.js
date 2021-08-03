import "./Form.css";
import { useState } from "react";
import { Tab, Tabs, AppBar } from "@material-ui/core";
import Signup from "./Signup";
import Login from "./Login";

function Form() {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (e, newValue) => {
    setSelectedTab(newValue);
  };
  return (
    <div>
      <div class="form">
        <ul class="tab-group">
          <AppBar position="static" className="musicTab">
            <Tabs
              value={selectedTab}
              onChange={handleChange}
              className="musicTab__container"
              centered
            >
              <Tab label="Login" />
              <Tab label="Register" />
            </Tabs>
          </AppBar>
        </ul>
        {selectedTab === 0 && <Login />}
        {selectedTab === 1 && <Signup />}
      </div>
    </div>
  );
}

export default Form;
