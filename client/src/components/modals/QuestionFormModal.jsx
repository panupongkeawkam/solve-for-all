import { Modal } from "@mui/material";

import palette from "../../style/palette";

import Button from "../buttons/Button";

export default ({
  active = false,
  submitText = "Submit",
  onSubmit,
  onClose,
}) => {
  return (
    <Modal open={active}>
      <div
        className="flex flex-row backdrop-blur-2xl"
        style={{ backgroundColor: `${palette["base-1"]}11` }}
      >
        <div className="basis-4/6 mx-auto h-screen py-10 ">
          {/* modal body */}
          <div
            className="w-full h-full rounded-[12px] shadow-2xl p-7"
            style={{ backgroundColor: palette["base-2"] }}
          >
            <div className="w-full flex flex-row">
              <div className="basis-3/4"></div>
              <div className="basis-1/4 flex justify-end">
                <span className="mr-2">
                  <Button
                    text="Cancel"
                    size="small"
                    variant="outlined"
                    onClick={onClose}
                  />
                </span>
                <Button text={submitText} size="small" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
