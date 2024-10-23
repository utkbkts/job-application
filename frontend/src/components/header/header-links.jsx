import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const menuLinks = [
  {
    id: 1,
    href: "/",
    title: "Ana Sayfa",
  },
  {
    id: 2,
    href: "/jobs",
    title: "İşler",
  },
  {
    id: 3,
    href: "/companies",
    title: "Şirketler",
  },
  {
    id: 4,
    href: "/bestSoftware",
    title: "en iyi yazılımcılar",
  },
];

const HeaderLinks = () => {
  const location = useLocation().pathname;
  return (
    <ul className="flex items-center gap-4">
      {menuLinks.map((item) => (
        <Link to={item.href} key={item.id}>
          <motion.li
            transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
            className={`relative overflow-hidden cursor-pointer header-links ${
              item.href === location ? "active" : ""
            }`}
            whileHover={{ scale: 1.05 }}
          >
            {item.title}
          </motion.li>
        </Link>
      ))}
    </ul>
  );
};

export default HeaderLinks;
