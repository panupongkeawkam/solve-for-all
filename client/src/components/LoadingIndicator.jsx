import { LinearProgress } from "@mui/material";

export default ({ active = false }) => {
  return (
    <div
      className="w-screen h-screen flex top-0 left-0 right-0 bottom-0 fixed z-[5000]"
      style={{
        background: "rgba(0, 0, 0, 40%)",
        display: active ? "flex" : "none",
      }}
    >
      <div className="w-full">
        <LinearProgress />
      </div>
    </div>
  );
};
