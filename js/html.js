function movieResultsHtml(movieObj) {
  const { imdbID, Title, Poster, Runtime, Genre, imdbRating, Plot } = movieObj;
  return `
      <li class="movie-results__movie" data-in-watchlist="0" data-id="${imdbID}">
      <img
        class="movie-results__img"
        src="${Poster}"
        alt=""
      />
      <div class="movie-results__details">
        <h3 class="movie-results__title">
          ${Title}
          <span class="movie-results__icon"
            ><i class="bx bxs-star"></i
          ></span>
          <span class="movie-results__rating">${imdbRating}</span>
        </h3>
        <div class="movie-results__info">
          <p>${Runtime}</p>
          <p>${Genre}</p>
          <button class="btn--watchlist">
          <i class="bx bxs-plus-circle"></i> add to watchlist
          </button>
        </div>
        <p class="movie-results__plot">
         ${Plot}
        </p>
      </div>
    </li>
      `;
}

export default movieResultsHtml;