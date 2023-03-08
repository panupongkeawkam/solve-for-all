import { useState } from "react";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import * as Icon from "@mui/icons-material";

import palette from "../../style/palette";

export default ({ active = false, onClose, user }) => {
  return (
    <>
      <Dialog
        open={active}
        closeAfterTransition
        maxWidth="xl"
        style={{ backdropFilter: "blur(40px)" }}
        PaperProps={{
          style: { borderRadius: 12, background: "none" },
        }}
      >
        <DialogContent
          dividers
          style={{
            height: "88vh",
            width: "55vw",
            padding: 0,
            background: palette["base-2"],
            borderBottom: "none",
            borderTop: "none",
          }}
        >
          <div className="flex justify-end p-7">
            <IconButton onClick={onClose}>
              <Icon.CloseOutlined />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
