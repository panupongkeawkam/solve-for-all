import Logo from "../components/Logo";

export default (props) => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <h1 className="text-6xl text-white font-bold">This is login page!</h1>
      <Logo />
    </div>
  );
};
