import { Skeleton } from "@mui/material";

import palette from "../../style/palette";

export default ({ }) => {
  return (
    <div
      className="w-full flex flex-row rounded-[12px] py-8  2xl:px-16 px-12"
      style={{ backgroundColor: palette["base-2"] }}
    >
      <div className="basis-full flex flex-row">
        <div className="2xl:pr-16 pr-12">
          <Skeleton variant="circular" width={120} height={120} />
        </div>
        <div className="w-full flex flex-row flex-wrap">
          <div className="basis-8/12">
            <Skeleton variant="rounded" width={"240px"} height={32} sx={{ mb: 1 }} />
            <Skeleton variant="text" sx={{ fontSize: 16, width: 120, mb: 2 }} />
            <Skeleton variant="text" sx={{ fontSize: 16, width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: 16, width: "100%" }} />
            <Skeleton variant="text" sx={{ fontSize: 16, width: "60%", mb: 4 }} />
          </div>
          <div className="basis-4/12 flex flex-row justify-end">
          </div>
          <div className="basis-1/2 mb-8">
            <div style={{ color: palette["content-2"] }}>Reputation point</div>
            <Skeleton variant="rounded" width={"80px"} height={16} sx={{ my: 1 }} />
          </div>
          <div className="basis-1/2 mb-8">
            <div style={{ color: palette["content-2"] }}>Solved</div>
            <Skeleton variant="rounded" width={"80px"} height={16} sx={{ my: 1 }} />
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Email
            </div>
            <Skeleton variant="rounded" width={"80px"} height={12} sx={{ my: 1 }} />
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Answered
            </div>
            <Skeleton variant="rounded" width={"80px"} height={12} sx={{ my: 1 }} />
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Birthday
            </div>
            <Skeleton variant="rounded" width={"80px"} height={12} sx={{ my: 1 }} />
          </div>
          <div className="basis-1/2 mb-6">
            <div className="mb-2" style={{ color: palette["content-2"] }}>
              Interest tags
            </div>
            <div className="flex flex-row">
              <Skeleton variant="rounded" width={"32px"} height={20} sx={{ my: 1, mr: 1 }} />
              <Skeleton variant="rounded" width={"32px"} height={20} sx={{ my: 1, mr: 1 }} />
              <Skeleton variant="rounded" width={"32px"} height={20} sx={{ my: 1 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
