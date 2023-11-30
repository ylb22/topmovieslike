const fetchJSON = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Response issue with url: ${url}`);
  }
  return response.json();
};

export const singleMovies = async (movieId) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASEURL}/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!res.ok) throw Error("Failed getting data");
  const data = await res.json();
  return data;
};

export const similarMovie = async (movieId) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=b71bcab3d07039b32d23c21d747e9d40&language=en-US&page=1`
  );
  if (!res.ok) throw Error("Failed getting data");
  const data = await res.json();
  return data;
};

export const movieVideo = async (movieId) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASEURL}/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!res.ok) throw Error("Failed getting data");
  const data = await res.json();
  return data;
};

export const movieImage = async (movieId) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASEURL}/movie/${movieId}/images?api_key=${process.env.REACT_APP_API_KEY}`
  );
  if (!res.ok) throw Error("Failed getting data");
  const data = await res.json();
  return data;
};

export const movieKeyword = async (movieId) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASEURL}/movie/${movieId}/keywords?api_key=${process.env.REACT_APP_API_KEY}`
  );
  if (!res.ok) throw Error("Failed getting data");
  const data = await res.json();
  return data;
};

export const movieCredit = async (movieId) => {
  const res = await fetch(
    `${process.env.REACT_APP_BASEURL}/movie/${movieId}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
  );
  if (!res.ok) throw Error("Failed getting data");
  const data = await res.json();
  return data;
};

export const castDetailsPersons = async (personId) => {
  // person

  const url = `${process.env.REACT_APP_BASEURL}/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const data = await fetchJSON(url);
  return data;
};
// movie credits
export const castDetailActors = async (personId) => {
  const url = `${process.env.REACT_APP_BASEURL}/person/${personId}/movie_credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
  const data = await fetchJSON(url);
  return [...data.cast].slice(0, 19);
};

export const getSearch = (query) => {
  fetch(
    `${process.env.REACT_APP_BASEURL}/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${query}&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      return [...data.results].slice(0, 4);
    });
};
