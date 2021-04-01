import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import ProjectEmployees from "./Components/ProjectEmployees";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route
            path="/projectEmployees/:projectID"
            children={<ProjectEmployees />}
          />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
