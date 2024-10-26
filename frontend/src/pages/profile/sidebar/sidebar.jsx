import {
  ArrowRight,
  CirclePlus,
  FileSpreadsheet,
  LayoutDashboard,
} from "lucide-react";
import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const settings = [
  {
    id: 1,
    name: "Ana sayfa",
    url: "/profile",
    icon: <LayoutDashboard />,
  },
  {
    id: 2,
    name: "Proje Paylaş",
    url: "/profile/create",
    icon: <CirclePlus />,
  },
  {
    id: 3,
    name: "Projelerim",
    url: "/profile/projects",
    icon: <FileSpreadsheet />,
  },
];

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};
const svgVariant = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation().pathname;
  const [active, setActive] = useState(location);

  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="h-full bg-neutral-900 shadow-neutral-600 shadow fixed top-0 left-0 ">
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial={"close"}
        className=" flex flex-col z-10 gap-20 p-5 min-h-screen"
      >
        <div className="flex flex-row w-full justify-between items-center">
          <div>
            <motion.button
              className="h-10 w-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full flex items-center justify-center cursor-pointer"
              variants={svgVariant}
              animate={svgControls}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => handleOpenClose()}
            >
              <ArrowRight />
            </motion.button>
          </div>
        </div>
        <div>
          <ul className="flex flex-col gap-4 ">
            {settings.map((item) => (
              <Link
                to={item.url}
                key={item.id}
                className={`flex gap-4 group hover:bg-blue-500 p-2 rounded-md ${
                  active === item.url ? "bg-blue-500" : ""
                }`}
                onClick={() => setActive(item.url)}
              >
                <span className="text-white">{item.icon}</span>
                {!isOpen && (
                  <span className="absolute left-16 bg-gray-800 text-white p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {item.name}
                  </span>
                )}
                <motion.li
                  className="text-white"
                  initial={{ display: "none", width: 0 }}
                  animate={
                    isOpen
                      ? { display: "block", width: "auto" }
                      : { display: "none" }
                  }
                >
                  {item.name}
                </motion.li>
              </Link>
            ))}
          </ul>
        </div>
      </motion.nav>
    </div>
  );
};

export default UserSidebar;
