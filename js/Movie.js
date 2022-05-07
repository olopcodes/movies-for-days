class Movie {
  constructor(imdbID, Title, Poster, Runtime, Genre, imdbRating, Plot) {
    this.imdbID = imdbID;
    this.Title = Title;
    this.Poster = Poster;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.imdbRating = imdbRating;
    this.Plot = Plot;
    // this.inWatchlist = false;
  }
}

function HandleMovieInfo(dataObj) {
  Object.assign(this, dataObj);

  // loop over watchlist array and check if movie is in there
  this.isMovieInWatchlist = function (movieWatchListArr) {
    // if (!movieWatchListArr.includes(this.imdbID)) {
    //   return '<i class="bx bxs-plus-circle"></i> add to watchlist';
    // } else {
    //   return `<i class='bx bxs-minus-circle'></i> remove`;
    // }
  };

  this.getMovieHtml = function (movieWatchListArr) {
    const { imdbID, Title, Poster, Runtime, Genre, imdbRating, Plot } = this;
    return `
    <li class="movie-results__movie" data-id="${imdbID}">
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
        <p>${Runtime} min</p>
        <p>${Genre}</p>
        <button class="btn--watchlist">
        '<i class="bx bxs-plus-circle"></i> add to watchlist'
        </button>
      </div>
      <p class="movie-results__plot">
       ${Plot}
      </p>
    </div>
  </li>
    `;
  };

  this.addMovieTowatchlistHandler = function () {
    const watchlistBtn = document.querySelector("btn--watchlist");
    watchlistBtn.addEventListener("click", () => {
      this.inWatchlist = true;

      console.log("add to watchlist");
    });
  };
}

function movieResultsHtml(movieObj) {
  const { imdbID, Title, Poster, Runtime, Genre, imdbRating, Plot } = movieObj;
  return `
    <li class="movie-results__movie" data-in-watchlist="false" data-id="${imdbID}">
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
        <i class="bx bxs-plus-circle"></i> add to watchlist</i>
        </button>
      </div>
      <p class="movie-results__plot">
       ${Plot}
      </p>
    </div>
  </li>
    `;
}

export default Movie;
