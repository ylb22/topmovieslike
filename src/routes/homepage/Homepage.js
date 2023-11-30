import React from "react";
import "./homepage.css";
import { motion } from "framer-motion";
import Hero from "./Hero";
import AllMovies from "./AllMovies";

export const pageVariant = {
  initial: {
    x: "100vw",
  },
  visible: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      delay: 0.5,
    },
  },
  exit: {
    x: "-100vw",
    transition: {
      ease: "easeInOut",
    },
  },
};

const Homepage = ({ setCurrentPage, currentPage }) => {
  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
    >
      <Hero />
      <section className="all-movies">
        <h2>Top Rated Movies</h2>
        <AllMovies setCurrentPage={setCurrentPage} currentPage={currentPage} />
      </section>
    </motion.main>
  );
};

export default Homepage;
