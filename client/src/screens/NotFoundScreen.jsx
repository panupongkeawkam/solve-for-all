import palette from "../style/palette";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Button from "../components/buttons/Button";
import Logo from "../components/Logo";

export default () => {
  const goBackHandler = () => {
    window.location.href = "/";
  };

  return (
    <>
      <Logo />
      <div className="w-screen h-screen flex justify-center items-center p-40">
        <div className="flex flex-col items-center justify-center mb-16">
          <img src="404-notfound.svg" width={480} />
          <h1 className="mb-2" style={{ color: palette["content-1"] }}>
            Page not found
          </h1>
          <p
            className="text-center mb-5"
            style={{ color: palette["content-2"] }}
          >
            You looking for a wrong way, or page got deleted
          </p>
          <Button
            color="content-1"
            text="Go home"
            variant="outlined"
            onClick={goBackHandler}
            startIcon={<ArrowBackIcon />}
          />
        </div>
      </div>
    </>
  );
};
