import palette from "../../style/palette";

export default ({
  label,
  activeIcon,
  inactiveIcon,
  active = false,
  ...props
}) => {
  return (
    <div
      className={
        "flex flex-row items-center w-full py-2 px-4 rounded-full cursor-pointer active:opacity-90 transition duration-100 mb-2"
      }
      style={{
        backgroundColor: active ? palette["base-2"] : "transparent",
        color: active ? palette.primary : palette["content-1"],
        fontSize: "16px",
      }}
    >
      <div className="mr-2">{active ? activeIcon : inactiveIcon}</div>
      <div>{label}</div>
    </div>
  );
};
