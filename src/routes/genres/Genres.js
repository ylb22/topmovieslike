import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./genres.css";
import { motion } from "framer-motion";
import { pageVariant } from "../homepage/Homepage";
import { useDispatch, useSelector } from "react-redux";
import { findByGenres } from "../../servies/movieListSlice";
import { getMovie } from "../../servies/movieSlice";
import Loader from "../../core-ui/Loader";

import { setSingleMovieId } from "../../servies/movieSlice";
import statusCode from "../../servies/statusCode";
import ReactPaginate from "react-paginate";

const Genres = () => {
  const { genreListMovies, genreList, status, pageAmount } = useSelector(
    (state) => state.movieList
  );
  const [currentPage, setCurrentPage] = useState(1);
  const { id: currentId } = genreList;

  const dispatch = useDispatch();
  const { id } = useParams();

  const handlePageClick = (event) => {
    setCurrentPage(() => event.selected);
    dispatch(findByGenres({ currentId, currentPage }));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (status === statusCode.LOADING) return <Loader />;

  return (
    <motion.main
      variants={pageVariant}
      initial="initial"
      animate="visible"
      exit="exit"
      className="genres-route"
    >
      <h2>{id.toUpperCase()}</h2>
      <ul className="genres-grid">
        {genreListMovies?.map((movie) => (
          <motion.li
            key={movie.id}
            className="homepage-movie"
            whileHover={{ scale: 1.1 }}
          >
            <Link
              onClick={() => {
                dispatch(getMovie(movie.id));
                dispatch(setSingleMovieId(movie));
              }}
              to={`/movies/${movie.title.toLowerCase().replace(/ /g, "-")}`}
            >
              <img
                alt={`${movie.title}`}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </Link>
            <section className="homepage-movie-meta">
              <h3 className="movie-title">{movie.title}</h3>
              <section className="homepage-movie-meta-title">
                <p>{movie.release_date.slice(0, 4)}</p>
                <h3 className="all-movies-rating">{movie.vote_average}</h3>
              </section>
            </section>
          </motion.li>
        ))}
      </ul>
      <ReactPaginate
        className="movies-pagination"
        forcePage={currentPage}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={(e) => {
          handlePageClick(e);
        }}
        pageRangeDisplayed={5}
        pageCount={pageAmount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
      {/* <PaginatedItems setCurrentPage={setCurrentPage} /> */}
    </motion.main>
  );
};

export default Genres;
