function movieWatchListHandler(el, searchArr, watchListArr) {
  el.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn--watchlist")) {
      const id = e.target.closest("li").dataset.id;
      const index = watchListArr.findIndex((movie) => movie.imdbID === id);
      if (index === -1) {
        const newMovie = searchArr.find((movie) => movie.imdbID === id);
        watchListArr.push(newMovie);

        e.target
          .closest("li")
          .querySelector(
            ".btn--watchlist"
          ).innerHTML = `<i class='bx bxs-minus-circle'></i> remove`;
      } else {
        watchListArr = watchListArr.filter((movie) => movie.imdbID !== id);
        e.target
          .closest("li")
          .querySelector(
            ".btn--watchlist"
          ).innerHTML = `<i class="bx bxs-plus-circle"></i> add to watchlist`;
        console.log(watchListArr, "removed a movie");
      }
    }
  });
}

export default movieWatchListHandler;
