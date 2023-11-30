import { Routes, Route } from "react-router-dom";
import React, { useState, useEffect, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import SpinnerFullPage from "./core-ui/SpinnerFullPage.jsx";
import "./core-ui/index.css";
import "./core-ui/light-mode.css";
import Homepage from "./routes/homepage/Homepage.js";
import About from "./routes/about/About.js";

import SingleMovie from "./routes/single-movie/SingleMovie.js";
import Genres from "./routes/genres/Genres.js";

import Videos from "./routes/videos/Videos.js";
import Pictures from "./routes/pictures/Pictures.js";

import Cast from "./routes/cast/Cast.js";
import SingleCast from "./routes/single-cast/SingleCast.js";
import NotFound from "./routes/not-found/NotFound";
import AppLayout from "./components/AppLayout";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const setThemeMode = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <Suspense fallback={<SpinnerFullPage />} />
      <Routes>
        <Route
          path="/"
          element={<AppLayout theme={theme} setThemeMode={setThemeMode} />}
        >
          <Route index element={<Homepage theme={theme} />} />
          <Route path={`/genres/:id`} element={<Genres theme={theme} />} />
          <Route path={`/movies/:id`} element={<SingleMovie theme={theme} />} />
          <Route path={`/cast/:id`} element={<Cast theme={theme} />} />
          <Route path={`/actors/:id`} element={<SingleCast theme={theme} />} />
          <Route
            path={`/movies/:id/videos`}
            element={<Videos theme={theme} />}
          />
          <Route
            path={`/movies/:id/pictures`}
            element={<Pictures theme={theme} />}
          />
          <Route path="/about" element={<About theme={theme} />} />
          <Route path="*" element={<NotFound theme={theme} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
