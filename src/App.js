import "./App.css";
import Form from "./components/forms/Form";
import { Switch, Route } from "react-router-dom";
import ForgotPassword from "./components/forms/ForgotPassword";
import Home from "./components/Home/Home";
import ResetPassword from "./components/forms/ResetPassword";

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/forgot-password" component={ForgotPassword} exact />
        <Route path="/home" component={Home} exact />
        <Route path="/reset-password" component={ResetPassword} exact />
        <Route path="/" component={Form} exact />
      </Switch>
    </div>
  );
}

export default App;
