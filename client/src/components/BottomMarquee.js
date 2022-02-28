import React from "react";
import { motion } from "framer-motion";

import "./Marquee.css";

const firstMarqueeVariants = {
  animate: {
    y: [-1000, 1],
    transition: {
      x: {
        duration: 5,
      },
    },
  },
};

const secondMarqueeVariants = {
  animate: {
    x: [1300, 750],
    transition: {
      x: {
        duration: 4,
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
          variants={firstMarqueeVariants}
          animate="animate"
        >
          <h1>
            T
            <br/>O
            <br/>T
            <br/>A
            <br/>L
          </h1>
        </motion.div>
        <motion.div
          className="track"
          variants={secondMarqueeVariants}
          animate="animate"
        >
          <h1>
            QUEST
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;