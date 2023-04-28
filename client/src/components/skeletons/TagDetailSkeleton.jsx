import { Skeleton } from "@mui/material";

import palette from "../../style/palette";

export default () => {
  return (
    <div className="2xl:basis-1/4 lg:basis-1/3 p-2">
      <div
        className="rounded-[12px] px-5 pt-5 pb-6"
        style={{ border: `1px solid ${palette["content-2"]}` }}
      >
        <h2 className="mb-2" style={{ color: palette["content-1"] }}>
          <Skeleton variant="rounded" width={120} height={16} sx={{ mb: 1 }} />
        </h2>
        <div className="flex flex-flex mb-2">
          <Skeleton variant="text" sx={{ fontSize: 12, width: 40 }} />
        </div>
      </div>
    </div>
  );
};
