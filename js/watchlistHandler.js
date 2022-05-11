import {
  saveWatchListToLocalStorage,
  getWatchListFromLocalStorage,
} from "./app.js";

function movieWatchListHandler(searchEl, searchArr) {
  searchEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn--watchlist")) {
      const id = e.target.closest("li").dataset.id;
      const myWatchList = getWatchListFromLocalStorage();
      if (myWatchList === null) addMovieToWatchList(e, id, searchArr);
      const index = myWatchList.findIndex((movie) => movie.imdbID === id);

      if (index === -1) {
        addMovieToWatchList(e, id, searchArr, myWatchList);
      } else {
        const watchList = getWatchListFromLocalStorage();
        removeMovieFromWatchList(watchList, id);
        updateRemovedMovieEl(e);
      }
    }
  });
}

function updateRemovedMovieEl(event) {
  event.target
    .closest("li")
    .querySelector(
      ".btn--watchlist"
    ).innerHTML = `<i class="bx bxs-plus-circle"></i> add to watchlist`;
}

function updateAddedMovieEl(event) {
  event.target
    .closest("li")
    .querySelector(
      ".btn--watchlist"
    ).innerHTML = `<i class='bx bxs-minus-circle'></i> remove`;
}

function removeMovieFromWatchList(arr, id) {
  arr = arr.filter((movie) => movie.imdbID !== id);
}

function addMovieToWatchList(e, id, searchArr, watchList) {
  const newMovie = searchArr.find((movie) => {
    if (movie.imdbID === id) {
      return {
        imdbID: movie.imdbID,
        Poster: movie.Poster,
        Title: movie.Title,
      };
    }
  });
  watchList.push(newMovie);
  saveWatchListToLocalStorage(myWatchList);
  updateAddedMovieEl(e);
}

export default movieWatchListHandler;
