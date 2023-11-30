import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getMovie } from "../servies/movieSlice";

const Upcoming = ({ upcomingMovies, setDisabledMenu }) => {
  const dispatch = useDispatch();
  return (
    <section className="upcoming-movies-section">
      <h3>Upcoming movies</h3>
      <ul className="upcoming-movies">
        {upcomingMovies.map((movie) => (
          <li
            key={movie.id}
            className="upcoming-movie"
            onClick={() => setDisabledMenu(true)}
          >
            <Link
              onClick={() => {
                dispatch(getMovie(movie.id));
              }}
              to={`/movies/${movie.title.toLowerCase().replace(/ /g, "-")}`}
            >
              <img
                alt={`${movie.title}`}
                src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              />
            </Link>
            <section className="upcoming-movie-meta">
              <h4>{movie.title}</h4>
              <p>{movie.release_date.slice(0, 4)}</p>
            </section>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Upcoming;
