import { Link, useLocation } from "react-router-dom";
import { menuLinks } from "./header-links";
import HeaderPopover from "./header-popover";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const sidebarVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

const MobileHeader = ({ isOpen, toggleSidebar }) => {
  const location = useLocation().pathname;

  return (
    <motion.div
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      variants={sidebarVariants}
      className="fixed bg-slate-900 text-white min-h-screen w-[250px] top-0 right-0 z-50 shadow-lg"
    >
      <div className="flex justify-end p-4">
        <FaTimes
          onClick={toggleSidebar}
          className="text-2xl cursor-pointer hover:text-gray-300"
        />
      </div>
      <ul className="flex flex-col gap-6 p-8">
        {menuLinks.map((item) => (
          <Link
            key={item.id}
            to={item.href}
            onClick={toggleSidebar}
            className={`relative overflow-hidden cursor-pointer text-lg header-links ${
              item.href === location
                ? "text-blue-500"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {item.title}
          </Link>
        ))}
        <div onClick={toggleSidebar}>
          <HeaderPopover />
        </div>
      </ul>
    </motion.div>
  );
};

export default MobileHeader;
