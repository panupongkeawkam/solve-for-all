import palette from "../style/palette";

export default (props) => {
  return (
    <div>
      <div
        className="rounded-[12px] p-5"
        style={{ backgroundColor: palette["base-2"] }}
      >
        <h1 className="text-6xl text-white font-bold">This is home page!</h1>
      </div>
    </div>
  );
};
