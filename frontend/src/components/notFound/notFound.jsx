import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen items-center flex justify-center flex-col bg-black select-none">
      <h1 className="font-bold text-2xl pb-4 text-white">
        Sanırım kayboldun sorun değil ana sayfaya hemen gidebilirsin...
      </h1>
      <img
        src="/confused-travolta.2cb7b484.gif"
        alt="Confused Travolta"
        className="w-[800px] h-[500px]"
      />
      <Link to={"/"} className="mt-12">
        <Button className="bg-blue-600">Ana Sayfa</Button>
      </Link>
    </div>
  );
};

export default NotFound;
