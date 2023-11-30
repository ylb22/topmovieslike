import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { findMovies } from "../../servies/movieListSlice";
import { getMovie, setSingleMovieId } from "../../servies/movieSlice";
import Loader from "../../core-ui/Loader";
//import { PaginatedItems } from "../../App";
import statusCode from "../../servies/statusCode";
import ReactPaginate from "react-paginate";

const movieCardVariant = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 1,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const AllMovies = () => {
  const { movieList, status, pageAmount } = useSelector(
    (state) => state.movieList
  );

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageClick = (event) => {
    setCurrentPage(() => event.selected);
    dispatch(findMovies(currentPage));
  };
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    dispatch(findMovies(currentPage));
  }, [dispatch, currentPage]);

  if (status === statusCode.LOADING) return <Loader />;

  return (
    <>
      <motion.ul className="homepage-movies">
        {movieList?.map((movie) => (
          <motion.li
            variants={movieCardVariant}
            whileHover="hover"
            key={movie.id}
            className="homepage-movie"
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
      </motion.ul>
      <ReactPaginate
        forcePage={currentPage}
        className="movies-pagination"
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
    </>
  );
};

export default AllMovies;
