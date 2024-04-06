import { CgProfile } from "react-icons/cg";
import { HiMiniSquares2X2 } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="w-full fixed top-0  h-20 bg-brand_green text-white flex justify-evenly items-center z-10">
      <span className="ml-5">
        Modulo de Consulta y Registros de Usuarios al Sistema
      </span>
      <div className="flex gap-3">
        <HiMiniSquares2X2 className="w-16 hover:cursor-pointer" />
        <CgProfile className="w-16 hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
