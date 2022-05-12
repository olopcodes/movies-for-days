import {
  saveWatchListToLocalStorage,
  getWatchListFromLocalStorage,
  updateWatchListButtonEl,
} from "./app.js";
function movieWatchListHandler(searchEl, moviesSearchedArr, myWatchList) {
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
        const myWatchList = getWatchListFromLocalStorage();
        saveWatchListToLocalStorage(
          myWatchList.filter((movie) => movie.imdbID !== movieId)
        );
        updateWatchListButtonEl(e, "rem");
      }
    }
  });
}

function addMovieToWatchList(arr, id, watchList) {
  const movieInfo = arr.find((movie) => movie.imdbID === id);

  watchList.push({
    Poster: movieInfo.Poster,
    imdbID: movieInfo.imdbID,
    Title: movieInfo.Title,
  });
  saveWatchListToLocalStorage(watchList);
}

export default movieWatchListHandler;
