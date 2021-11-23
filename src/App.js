import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyle";
import HomePage from "./components/HomePage";

const App = () => (
  <React.Suspense fallback="loading">
    <GlobalStyles />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </React.Suspense>
);

export default App;
