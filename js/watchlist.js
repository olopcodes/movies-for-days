function handleMovieToWatchList(searchList, watchList, el) {
  el.addEventListener("click", (e) => {
    let inWatchlistValue = e.target.closest("li").dataset.inWatchlist;
    const id = e.target.closest("li").dataset.id;

    if (
      e.target.classList.contains("btn--watchlist") &&
      !Number(inWatchlistValue)
    ) {
      addToWatchlist(searchList, watchList, e.target, id);
      //   console.log(watchList);
    } else if (
      e.target.classList.contains("btn--watchlist") &&
      Number(inWatchlistValue)
    ) {
      removeFromWatchlist(watchList, e.target, id);
      //   console.log(watchList);
    }
  });
}

function addToWatchlist(searchResults, watchList, target, id) {
  target.closest("li").dataset.inWatchlist = 1;
  target
    .closest("li")
    .querySelector(
      ".btn--watchlist"
    ).innerHTML = `<i class='bx bxs-minus-circle'></i> remove`;

  const movieToAdd = searchResults.find((movie) => movie.imdbID === id);
  watchList.push(movieToAdd);
}

function removeFromWatchlist(watchList, target, id) {
  target.closest("li").dataset.inWatchlist = false;
  target
    .closest("li")
    .querySelector(
      ".btn--watchlist"
    ).innerHTML = `<i class="bx bxs-plus-circle"></i> add to watchlist`;

  const index = watchList.findIndex((movie) => movie.imdbID === id);
  watchList.slice(index, 1);
  console.log(watchList);
}

export { handleMovieToWatchList, addToWatchlist, removeFromWatchlist };
