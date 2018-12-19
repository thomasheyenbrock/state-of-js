import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyle";
import HomePage from "./components/HomePage";

const App = () => (
  <React.Suspense fallback="loading">
    <GlobalStyles />
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Redirect to="/" />
    </Switch>
  </React.Suspense>
);

export default App;
