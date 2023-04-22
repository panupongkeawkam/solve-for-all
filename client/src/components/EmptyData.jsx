import palette from "../style/palette";

export default ({ title, description = "", minimized = false }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {minimized ? (
        <>
          <p className="mb-1" style={{ color: palette["content-2"] }}>
            {title}
          </p>
          <span style={{ color: palette["content-3"] }}>{description}</span>
        </>
      ) : (
        <>
          <img
            className="opacity-40 mb-3"
            width={120}
            src="/empty-data.svg"
            alt="No data icon"
          ></img>
          <h2 style={{ color: palette["content-2"] }}>{title}</h2>
          <p style={{ color: palette["content-3"] }}>{description}</p>
        </>
      )}
    </div>
  );
};
