import React from "react";
import { motion } from "framer-motion";
import "./Marquee.css";

const firstMarqueeVariants = {
  animate: {
    x: [-250, 450],
    transition: {
      x: {
        duration: 4,
      },
    },
  },
};

const secondMarqueeVariants = {
  animate: {
    x: [1300, 800],
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
            EXPLORE
          </h1>
        </motion.div>
        <motion.div
          className="track"
          variants={secondMarqueeVariants}
          animate="animate"
        >
          <h1>
            DISCOVER
          </h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;