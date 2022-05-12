import {
  getWatchListFromLocalStorage,
  updateWatchListButtonEl,
  addMovieToWatchList,
  removeMovieFromWatchList,
} from "./app.js";

function movieWatchListHandler(searchEl, moviesSearchedArr) {
  searchEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn--watchlist")) {
      const moviesInWatchList = getWatchListFromLocalStorage();
      const movieId = e.target.closest("li").dataset.id;
      const isMovieInWatchList = moviesInWatchList.findIndex(
        (movie) => movie.imdbID === movieId
      );

      if (isMovieInWatchList === -1) {
        addMovieToWatchList(moviesSearchedArr, movieId, moviesInWatchList);
        updateWatchListButtonEl(e, "add");
      } else {
        removeMovieFromWatchList(e);
        updateWatchListButtonEl(e, "rem");
      }
    }
  });
}

export default movieWatchListHandler;
