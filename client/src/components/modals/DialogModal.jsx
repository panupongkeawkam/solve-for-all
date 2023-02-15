import { Modal } from "@mui/material";

import palette from "../../style/palette";

import Button from "../buttons/Button";

export default ({
  active = false,
  confirmText = "Confirm",
  title,
  description,
  onConfirm = undefined,
  danger = false,
  onClose,
}) => {
  return (
    <Modal open={active}>
      <div
        className="flex flex-row backdrop-blur-2xl"
        style={{ backgroundColor: `${palette["base-1"]}11` }}
      >
        <div className="2xl:basis-1/3 xl:basis-1/2 lg:basis-1/2 md:basis-1/2 sm:3/4 mx-auto h-screen py-10 flex items-center">
          {/* modal body */}
          <div
            className="w-full rounded-[12px] shadow-2xl p-28"
            style={{ backgroundColor: palette["base-2"] }}
          >
            <div className="w-full flex flex-row flex-wrap">
              <div className="basis-full flex justify-center mb-2">
                <h1 style={{ color: palette["content-1"] }}>{title}</h1>
              </div>
              <div className="basis-full flex justify-center mb-4 text-center">
                <p style={{ color: palette["content-2"] }}>{description}</p>
              </div>
            </div>
            <div className="w-full flex flex-row justify-center">
              <div className="basis-1/2">
                <div className="px-2">
                  <Button
                    text={onConfirm !== undefined ? "Cancel" : "Okay"}
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                  />
                </div>
              </div>
              {onConfirm !== undefined ? (
                <div className="basis-1/2">
                  <div className="px-2">
                    <Button
                      text={confirmText}
                      fullWidth
                      color={danger ? "wrong" : "secondary"}
                      onClick={onConfirm}
                    />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
