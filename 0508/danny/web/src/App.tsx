import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import List from "./List";
import Create from "./DocotrCreate";
import Edit from "./Edit";
import Show from "./Show";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/show" element={<Show />} />
      </Routes>
    </Router>
  );
}

export default App;
