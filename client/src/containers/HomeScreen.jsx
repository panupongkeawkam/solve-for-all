import React, { useState } from "react";
import { Routes, Route, Link as RouterLink } from "react-router-dom";

import palette from "../style/palette";

import HomePage from "../pages/HomePage";
import InterestedPage from "../pages/InterestedPage";
import ComponentTestPage from "../pages/ComponentTestPage";

import QuestionFormModal from "../components/modals/QuestionFormModal";
import Button from "../components/buttons/Button";
import Logo from "../components/Logo";

export default (props) => {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  const addQuestionSubmitHandler = (question) => {
    console.log(question);
    // POST to server
  };

  const toggleAddQuestionModalHandler = () => {
    setShowAddQuestionModal(!showAddQuestionModal);
  };

  return (
    <div
      className="flex flex-col w-screen h-screen overflow-x-hidden"
      style={{ backgroundColor: palette["base-1"] }}
    >
      <div className="w-full flex flex-row sticky top-0 py-2 px-4">
        <div className="basis-1/6 flex items-center"></div>
        <div className="basis-5/6 flex flex-row justify-end items-center">
          <Button text="Ask question" onClick={toggleAddQuestionModalHandler} />
          <RouterLink to="/login" className="mx-3">
            <Button text="Login" variant="outlined" size="small" />
          </RouterLink>
          <RouterLink to="/signup">
            <Button text="Sign up" size="small" />
          </RouterLink>
        </div>
      </div>
      <div className="w-full flex flex-row">
        <div className="basis-1/6"></div>
        <div className="basis-4/6">
          <Routes>
            <Route index path="/" element={<HomePage />} />
            <Route path="/interested" element={<InterestedPage />} />
            <Route path="/test" element={<ComponentTestPage />} />
          </Routes>
        </div>
        <div className="basis-1/6"></div>
      </div>
      <Logo />
      <QuestionFormModal
        active={showAddQuestionModal}
        submitText="Publish"
        doingMessage="Asking question..."
        onSubmit={addQuestionSubmitHandler}
        onClose={toggleAddQuestionModalHandler}
      />
    </div>
  );
};
