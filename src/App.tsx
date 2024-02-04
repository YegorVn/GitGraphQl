import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./views";
import "./App.scss"

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
