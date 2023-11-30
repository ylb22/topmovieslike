import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statusCode from "./statusCode";

const initialState = {
  movieList: [],
  genreList: {},
  genreListMovies: [],
  trendingMovies: [],
  pageAmount: 0,
  currentPage: 1,
  status: statusCode.IDLE,
};

export const findMovies = createAsyncThunk(
  "movieList/findMovies",
  async (currentPage) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`
    );
    const data = await res.json();
    return [...data.results];
  }
);

export const findByGenres = createAsyncThunk(
  "movieList/findByGenres",
  async function (obj) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const { currentId: genreId, currentPage } = obj;

    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_genres=${genreId}&page=${currentPage}`
    );
    const data = await res.json();

    return [...data.results];
  }
);

export const getTrending = createAsyncThunk(
  "movieList/getTrending",
  async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASEURL}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const data = await res.json();
    return [...data.results].slice(0, 6);
  }
);
const movieListSlice = createSlice({
  name: "movieList",
  initialState,
  reducers: {
    genreInfo(state, action) {
      state.genreList = action.payload;
    },
    updatePage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findMovies.pending, (state) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(findMovies.fulfilled, (state, action) => {
      state.movieList = action.payload;
      state.status = statusCode.IDLE;
      state.pageAmount = 499;
    });

    builder.addCase(findMovies.rejected, (state, action) => {
      state.status = statusCode.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(findByGenres.pending, (state) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(findByGenres.fulfilled, (state, action) => {
      state.status = statusCode.IDLE;
      state.genreListMovies = action.payload;
      state.pageAmount = 499;
    });
    builder.addCase(findByGenres.rejected, (state, action) => {
      state.status = statusCode.ERROR;

      state.error = action.error.message;
    });

    builder.addCase(getTrending.pending, (state) => {
      state.status = statusCode.LOADING;
    });
    builder.addCase(getTrending.fulfilled, (state, action) => {
      state.status = statusCode.IDLE;

      state.trendingMovies = action.payload;
    });
    builder.addCase(getTrending.rejected, (state, action) => {
      state.status = statusCode.ERROR;

      state.error = action.error.message;
    });
  },
});

export const { genreInfo, updatePage } = movieListSlice.actions;
export default movieListSlice.reducer;
