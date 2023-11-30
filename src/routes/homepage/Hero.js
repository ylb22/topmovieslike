import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "./hero.css";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../../servies/movieSlice";
import { getTrending } from "../../servies/movieListSlice";

import Loader from "../../core-ui/Loader";
import statusCode from "../../servies/statusCode";

const Hero = () => {
  const dispatch = useDispatch();
  const { trendingMovies, status } = useSelector((state) => state.movieList);
  useEffect(() => {
    dispatch(getTrending());
  }, [dispatch]);

  if (status === statusCode.LOADING) return <Loader />;
  return (
    <Carousel autoPlay="true" showArrows="true" infiniteLoop="true">
      {trendingMovies.map((movie) => (
        <section key={movie.id} className="movie-section">
          <img
            alt={`${movie.title}`}
            className="slider-img"
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          />
          <section className="trending-link">
            <h3>
              {movie.title}
              <br /> <span> {movie.release_date.slice(0, 4)}</span>
            </h3>
            <p>{movie.overview}</p>
            <Link
              onClick={() => dispatch(getMovie(movie.id))}
              to={`/movies/${movie.title
                .toLowerCase()
                .replace(/ |\/|#/g, "-")}`}
            >
              Watch now
            </Link>
          </section>
        </section>
      ))}
    </Carousel>
  );
};

export default Hero;
