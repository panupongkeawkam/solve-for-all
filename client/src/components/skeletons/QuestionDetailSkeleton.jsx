import { Skeleton } from "@mui/material";

import palette from "../../style/palette";

export default ({}) => {
  return (
    <div
      className="flex flex-row rounded-[12px] py-5 px-8 my-2"
      style={{ backgroundColor: palette["base-2"] }}
    >
      <div className="basis-auto flex flex-col mr-8">
        <Skeleton variant="circular" width={64} height={64} />
      </div>
      <div className="basis-full flex flex-col">
        <div className="basis-full flex flex-row mb-1">
          <div className="basis-1/2 flex flex-row mb-1">
            <Skeleton variant="text" sx={{ fontSize: 16, width: 120 }} />
            <Skeleton variant="text" sx={{ fontSize: 12, width: 40, ml: 2 }} />
          </div>
          <div className="basis-1/2 flex flex-row flex-wrap justify-end">
            <div className="flex flex-row mr-8">
              <Skeleton variant="text" sx={{ fontSize: 12, width: 32 }} />
            </div>
            <div className="flex flex-row mr-8">
              <Skeleton variant="text" sx={{ fontSize: 12, width: 32 }} />
            </div>
            <div className="flex flex-row">
              <Skeleton variant="text" sx={{ fontSize: 12, width: 32 }} />
            </div>
          </div>
        </div>
        <div className="basis-full flex flex-row mb-3">
          <Skeleton variant="text" sx={{ fontSize: 12, width: 40 }} />
        </div>
        <div className="basis-full flex flex-row mb-3">
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={32}
            sx={{ mt: 2, mb: 2 }}
          />
        </div>
        <div className="basis-full flex flex-row flex-wrap mb-10">
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={80}
            sx={{ mb: 2 }}
          />
          <Skeleton
            variant="rounded"
            width={"100%"}
            height={110}
            sx={{ mb: 2 }}
          />
        </div>
        <div className="basis-full flex flex-col mb-6"></div>
      </div>
    </div>
  );
};
