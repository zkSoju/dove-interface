import React from "react";
import { motion } from "framer-motion";
import { transitionAnimation } from "../../lib/utils";
import Navbar from "../Navbar";

const Article = ({ children }) => {
  return (
    <motion.article
      variants={transitionAnimation}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className="relative w-full"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center overflow-hidden">
        <Navbar />
        {children}
      </div>
    </motion.article>
  );
};

export default Article;
