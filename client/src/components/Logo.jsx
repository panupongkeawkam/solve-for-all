import { Link as RouterLink } from "react-router-dom";

export default () => {
  return (
    <RouterLink to="/" className="absolute top-4 2xl:left-8 left-4">
      <img
        className="cursor-pointer hover:opacity-90 transition"
        src="/logo.png"
        width="36"
        alt="Solve for all logo - link to home page"
      />
    </RouterLink>
  );
};
