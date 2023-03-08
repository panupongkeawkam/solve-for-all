import React, { useRef, useState } from "react";
import {} from "@mui/material";
import * as Icon from "@mui/icons-material";

import EmptyData from "../components/EmptyData";

export default (props) => {
  return (
    <div className="p-5 flex flex-row flex-wrap mb-10">
      <div className="basis-full 2xl:h-[720px] h-[480px]">
        <EmptyData
          title={"No questions"}
          description={"There is no questions of your interested tags"}
        />
      </div>
    </div>
  );
};
