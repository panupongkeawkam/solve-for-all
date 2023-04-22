import React, { useState } from "react";
import {
  IconButton,
  Select,
  MenuItem,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useParams } from "react-router-dom";
import * as Icon from "@mui/icons-material";

import palette from "../style/palette";

import Button from "../components/buttons/Button";
import Tag from "../components/Tag";
import Dialog from "../components/modals/DialogModal";

export default () => {
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const { testId } = useParams();

  const toggleDialogHandler = () => {
    setShowDialog(!showDialog);
  };

  return (
    <div className="p-5 flex flex-row flex-wrap mb-10">
      <div className="2xl:basis-1/4 md:basis-3/4">
        <Button
          text="Show confirm modal"
          size="small"
          variant="outlined"
          color="correct"
          onClick={toggleDialogHandler}
        />
        <Dialog
          active={showDialog}
          title="This is a alert modal"
          description={
            "simply dummy text of the printing and typesetting industry."
          }
          danger
          onClose={toggleDialogHandler}
          // confirmText="Logout"
          // onConfirm={toggleDialogHandler}
        />
      </div>
    </div>
  );
};
