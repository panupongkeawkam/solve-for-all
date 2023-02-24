import "../style/loading-indicator.css";

export default ({ active = false }) => {
  return (
    <div
      className="w-screen h-screen flex justify-center items-center top-0 left-0 right-0 bottom-0 fixed z-[5000]"
      style={{
        background: "rgba(0, 0, 0, 50%)",
        display: active ? "flex" : "none",
      }}
    >
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
