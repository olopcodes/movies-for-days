import { watchlistHTML } from "./html.js";

function movieWatchListHandler(searchEl, searchArr, watchListArr) {
  searchEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn--watchlist")) {
      const id = e.target.closest("li").dataset.id;
      const index = watchListArr.findIndex((movie) => movie.imdbID === id);

      if (index === -1) {
        const newMovie = searchArr.find((movie) => {
          if (movie.imdbID === id) {
            return {
              imdbID: movie.imdbID,
              Poster: movie.Poster,
              Title: movie.Title,
            };
          }
        });
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

function renderWatchLsit(watchListEl, watchListArr) {
  let html = ``;
  if (watchListArr.length >= 1) {
    for (let movie of watchListArr) {
      html += watchlistHTML(movie);
    }
  }

  watchListEl.innerHTML = html;
}

export default movieWatchListHandler;
