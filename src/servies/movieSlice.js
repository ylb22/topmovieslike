import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statusCode from "./statusCode";
import {
  movieImage,
  singleMovies,
  similarMovie,
  movieVideo,
  movieKeyword,
  movieCredit,
  castDetailsPersons,
  castDetailActors,
} from "./movieApi";

const initialState = {
  singleMovie: [],
  similarMovies: [],
  videos: [],
  videoPreview: [],
  pictures: [],
  picturesPreview: [],
  keywords: [],
  cast: [],
  castPreview: [],
  castDetails: [],
  actedIn: [],
  searchResults: [],
  status: statusCode.IDLE,
  singleMovieId: [],
};

export const getMovie = createAsyncThunk("movie/getMovie", async (movieId) => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

  // single movie
  const data = await singleMovies(movieId);
  const singleMovie = {
    ...data,
    title: data.title,
    cover: data.poster_path,
    budget: data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    revenue: data.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    overview: data.overview,
    tagline: data.tagline,
    release_year: data.release_date.slice(0, 4),
    release: data.release_date,
    imdb_id: data.imdb_id,
    votes: data.vote_count,
    voteavg: data.vote_average.toFixed(1),
    genres: [...data.genres],
    countries: [...data.production_countries],
    duration: data.runtime,
    original_lang: data.original_language.toUpperCase(),
    status: data.status,
    backdrop_path: data.backdrop_path,
  };

  const similarMovieData = await similarMovie(movieId);
  const similarMovies = [...similarMovieData.results].slice(0, 5);

  // movie videos
  const movieVidoes = await movieVideo(movieId);
  const splitVids = movieVidoes.results.filter((key, index) => index <= 1);

  const videos = {
    ...movieVidoes,
    id: [...movieVidoes.results],
    size: [...movieVidoes.results].length,
  };
  const videoPreview = {
    ...videos,
    id: splitVids,
  };

  // movie images
  const movieImages = await movieImage(movieId);
  const splitImgs = movieImages.backdrops.filter((key, index) => index <= 1);
  const pictures = {
    ...movieImages,
    id: [...movieImages.backdrops],
    size: [...movieImages.backdrops].length,
  };
  const picturesPreview = {
    ...pictures,
    id: splitImgs,
  };
  // movie keywords

  const movieKeywords = await movieKeyword(movieId);
  const keywords = { ...movieKeywords, keyword: [...movieKeywords.keywords] };

  // movie credits

  const movieCredits = await movieCredit(movieId);
  const cast = [...movieCredits.cast];
  const castPreview = [...movieCredits.cast].slice(0, 5);

  return {
    singleMovie,
    similarMovies,
    videos,
    videoPreview,
    pictures,
    picturesPreview,
    keywords,
    cast,
    castPreview,
  };
});

export const getCastDetails = createAsyncThunk(
  "movie/getCastDetails",
  async (personId) => {
    const data = await castDetailsPersons(personId);

    const castDetails = {
      ...data,
      name: data.name,
      biography: data.biography,
      birthday: data.birthday,
      known_for_department: data.known_for_department,
      place_of_birth: data.place_of_birth,
      profile_path: data.profile_path,
    };

    const actors = castDetailActors(personId);

    return { castDetails, actors };
  }
);

export const getSearch = createAsyncThunk("movie/getSearch", async (query) => {
  if (query === "") {
    const data = [];
    return data;
  }
  const data = await getSearch(query);
  return data;
});

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSingleMovieId(state, action) {
      state.singleMovieId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovie.pending, (state) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.singleMovie = action.payload.singleMovie;
      state.similarMovies = action.payload.similarMovies;
      state.videos = action.payload.videos;
      state.videoPreview = action.payload.videoPreview;
      state.pictures = action.payload.pictures;
      state.picturesPreview = action.payload.picturesPreview;
      state.keywords = action.payload.keywords;
      state.cast = action.payload.cast;
      state.castPreview = action.payload.castPreview;
      state.status = statusCode.IDLE;
    });

    builder.addCase(getMovie.rejected, (state, action) => {
      state.status = statusCode.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(getCastDetails.pending, (state) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(getCastDetails.fulfilled, (state, action) => {
      state.castDetails = action.payload.castDetails;
      state.actedIn = action.payload.actors;
      state.status = statusCode.IDLE;
    });

    builder.addCase(getCastDetails.rejected, (state, action) => {
      state.status = statusCode.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(getSearch.pending, (state) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(getSearch.fulfilled, (state, action) => {
      state.searchResult = action.payload;
      state.status = statusCode.IDLE;
    });

    builder.addCase(getSearch.rejected, (state, action) => {
      state.status = statusCode.ERROR;
      state.error = action.error.message;
    });
  },
});

export const { setSingleMovieId } = movieSlice.actions;

export default movieSlice.reducer;
