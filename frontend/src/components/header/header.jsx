import { useState } from "react";
import HeaderLinks from "./header-links";
import HeaderPopover from "./header-popover";
import MobileHeader from "./mobile-header";
import { AlignJustify } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <header className="w-full bg-gradient-to-r from-white via-gray-100 to-white shadow-lg py-6">
      <div className="flex container mx-auto items-center justify-between">
        <Link to={"/"} className="flex items-center cursor-pointer">
          <div className="relative">
            <img
              src="/logo/yup.png"
              alt="Logo"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">
            Kariyer <span className="text-red-500">Hedefi</span>
          </h1>
        </Link>

        <nav className="md:flex hidden items-center gap-2 ">
          <HeaderLinks />
          <HeaderPopover />
        </nav>
        <button
          onClick={toggleSidebar}
          className="p-2 bg-blue-500 text-white fixed top-8 right-4 z-50 md:hidden flex"
        >
          <AlignJustify />
        </button>
        <nav className="md:hidden flex">
          <MobileHeader toggleSidebar={toggleSidebar} isOpen={isOpen} />
        </nav>
      </div>
    </header>
  );
};

export default Header;
