import "./styles.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DowntownInnerarity from "./Components/Pages/DowntownInnerarity/DowntownInnerarity";
import LandingPage from "./Components/Pages/LandingPage/LandingPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/DonwtownInnterarity" element={<LandingPage />} />
        <Route path="/" element={<DowntownInnerarity />} />
      </Routes>
    </Router>
  );
};

export default App;
