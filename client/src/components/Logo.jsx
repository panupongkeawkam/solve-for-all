import { Link as RouterLink } from "react-router-dom";

export default () => {
  return (
    <RouterLink to="/" className="absolute top-4 left-4">
      <img
        className="cursor-pointer hover:opacity-90 transition"
        src="/logo.png"
        width="36"
      />
    </RouterLink>
  );
};
