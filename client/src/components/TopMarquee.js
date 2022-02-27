import React from "react";
// 1. Importing framer-motion
import { motion } from "framer-motion";

import "./Marquee.css";

// 2. Defining Variants
const marqueeVariants = {
  animate: {
    x: [-250, 1550],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 10,
        ease: "linear",
      },
    },
  },
};

const Marquee = () => {
  return (
    <div>
      <div className="marquee">
        <motion.div
          className="track"
          variants={marqueeVariants}
          animate="animate"
        >
          <h1>
            EXPLORE
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;