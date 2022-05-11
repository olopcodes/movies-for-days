import { watchlistHTML } from "./html.js";
import { renderMovies, getWatchListFromLocalStorage } from "./app.js";

const watchListEl = document.querySelector("#watchlist .movie-results__list");
let watchHTML = "";

window.addEventListener("load", (e) => {
  //   on load check if wathclist has movies
  const list = getWatchListFromLocalStorage();
  if (list.length > 0) {
    renderMovies(watchListEl, watchHTML, list, watchlistHTML);
  }
});
