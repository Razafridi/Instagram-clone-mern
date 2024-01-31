import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { motion } from "framer-motion";
function IconButton({ Icon, title, hanlder, color }) {
  return (
    <motion.button
      whileTap={{
        scale: 1.1,
        opacity: 0.3,
      }}
      transition={{
        type: "spring",
        bounce: 0.25,
      }}
      onClick={hanlder}
      className="p-1 flex items-center gap-2"
    >
      <Icon size={20} color={color} />
      <span className="font-semibold text-gray-900 text-sm">{title}</span>
    </motion.button>
  );
}

export default IconButton;
