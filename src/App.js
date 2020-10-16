import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Todos from "./UserTodos/UserTodos";
import PageNotFound from "./UserTodos/PageNotFound";
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"><Todos /></Route>
          <Route path="/Todos" ><Todos /></Route>
          <Route ><PageNotFound /></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
