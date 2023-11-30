import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import Upcoming from "./Upcoming";
import ChevronLight from "../assets/images/chevron-light.png";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { findByGenres, genreInfo } from "../servies/movieListSlice";

const menuVariant = {
  initial: {
    x: "-100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      duration: 1,
    },
  },
  exit: {
    x: "-100vw",
    opacity: 0,
    transition: {
      delay: 0.1,
      duration: 3,
    },
  },
};

const Header = ({ disabledMenu, setDisabledMenu }) => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genreList, setGenreList] = useState([]);

  const currentPage = 1;

  const dispatch = useDispatch();

  const [enabled, setEnabled] = useState(false);
  const toggleGenres = () => {
    enabled ? setEnabled(false) : setEnabled(true);
  };

  const findGenres = async function () {
    const res = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US`
    );
    const data = await res.json();

    setGenreList([...data.genres]);
  };

  const getUpcoming = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`
      );
      const data = await response.json();
      setUpcomingMovies([...data.results].slice(0, 6));
    } catch (err) {}
  };
  useEffect(() => {
    getUpcoming();
    findGenres();
  }, []);
  return (
    <AnimatePresence mode="wait">
      {!disabledMenu ? (
        <motion.nav
          variants={menuVariant}
          initial="initial"
          animate="visible"
          exit="exit"
          className="sidebar"
        >
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/" onClick={() => setDisabledMenu(true)}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="about" onClick={() => setDisabledMenu(true)}>
                About
              </NavLink>
            </li>
            <li>
              {enabled ? (
                <button onClick={toggleGenres} className=" enabled-chevron">
                  Genres{" "}
                  <img alt="toggle off genres menu button" src={ChevronLight} />
                </button>
              ) : (
                <button onClick={toggleGenres} className="chevron">
                  Genres{" "}
                  <img alt="toggle genres menu button" src={ChevronLight} />
                </button>
              )}
            </li>
          </ul>
          {enabled ? (
            <motion.ul
              variants={menuVariant}
              exit="exit"
              className="genres-menu"
            >
              {genreList.map((genre) => (
                <li key={genre.id}>
                  <NavLink
                    onClick={() => {
                      dispatch(
                        findByGenres({ currentId: genre.id, currentPage })
                      );
                      dispatch(genreInfo(genre));
                      setDisabledMenu(true);
                      setEnabled(false);
                    }}
                    to={`/genres/${genre.name.toLowerCase()}`}
                  >
                    {genre.name}
                  </NavLink>
                </li>
              ))}
            </motion.ul>
          ) : null}

          <Upcoming
            upcomingMovies={upcomingMovies}
            setDisabledMenu={setDisabledMenu}
          />
        </motion.nav>
      ) : null}
    </AnimatePresence>
  );
};

export default Header;
