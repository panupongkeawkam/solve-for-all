import React from "react";
import { Routes, Route, Link } from "react-router-dom";

import HomePage from "../pages/HomePage";
import InterestedPage from "../pages/InterestedPage";
import ComponentTestPage from "../pages/ComponentTestPage";

import Button from "../components/buttons/Button";

export default (props) => {
  return (
    <div className="flex flex-row">
      <div className="basis-1/6 h-screen bg-black sticky top-0">
        <h1 className="text-white overflow-x-hidden">
          test
        </h1>
      </div>
      <div className="basis-4/6 mx-auto">
        <div className="w-full bg-black p-5 text-white sticky top-0 z-50">
          <h1>This is a nav bar</h1>
          {/* <Link to="/interested">
            <Button text="Navigate" />
          </Link> */}
        </div>
        <div className="w-full overflow-auto">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/interested" element={<InterestedPage />} />
            <Route path="/test" element={<ComponentTestPage />} />
          </Routes>
        </div>
      </div>
      <div className="basis-1/6 h-screen bg-black sticky top-0 overflow-x-hidden"></div>
    </div>
  );
};
