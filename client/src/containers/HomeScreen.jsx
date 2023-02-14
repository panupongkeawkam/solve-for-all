import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import InterestedPage from "../pages/InterestedPage";
import HomePage from "../pages/HomePage";

import Button from "../components/buttons/Button";

export default (props) => {
  return (
    <div className="flex flex-row">
      <div className="basis-1/6 h-screen bg-black"></div>
      <div className="basis-4/6">
        <div className="w-full bg-black p-5 text-white">
          <h1>This is a nav bar</h1>
          <Link to="/interested">
            <Button text="Navigate" />
          </Link>
        </div>
        <div className="w-full">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/interested" element={<InterestedPage />} />
          </Routes>
        </div>
      </div>
      <div className="basis-1/6 h-screen bg-black"></div>
    </div>
  );
};
