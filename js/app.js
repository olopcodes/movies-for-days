import movieKey from "./key.js";
import Movie from "./Movie.js";

const movieIDs = [];
const moviesResultsArr = [];
const movieWatchListArr = [];
const movieForm = document.querySelector("#movie-form");
const movieSearchInput = movieForm.querySelector("#movie-search");

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (movieSearchInput.value) {
    await searchMovieDB(movieKey, movieSearchInput.value);
    await getMovieInfoWithID(movieKey, movieIDs);
  } else {
    console.log("Enter a movie title");
  }

  clearMovieInput();
});

// search movie db by input value
async function searchMovieDB(keyObj, searchTitle) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${keyObj.key}&s=${searchTitle}`
  );
  const data = await res.json();
  addMovieIDtoArray(data);
}

// adding movie id to array
function addMovieIDtoArray(data) {
  for (let item of data.Search) {
    movieIDs.push(item.imdbID);
  }
}

// using movie id to get more info about movie
async function getMovieInfoWithID(keyObj, movieIDs) {
  for (let id of movieIDs) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${keyObj.key}&i=${id}`
    );
    const data = await res.json();
    storeMovieResults(data);
  }
}

// clear input field
function clearMovieInput() {
  movieSearchInput.value = "";
}

// store movie in an arr to be render
function storeMovieResults(data) {
  const { imdbID, Title, Poster, Runtime, Genre, imdbRating, Plot } = data;
  const newMovie = new Movie(
    imdbID,
    Title,
    Poster,
    Runtime,
    Genre,
    imdbRating,
    Plot
  );
  moviesResultsArr.push(newMovie);
  console.log(moviesResultsArr);
}

function HandleMovieInfo(dataObj) {
  Object.assign(this, dataObj);

  // loop over watchlist array and check if movie is in there
  this.isMovieInWatchlist = function () {
    //  '<i class="bx bxs-plus-circle"></i> add to watchlist'
    //  `<i class='bx bxs-minus-circle'></i> remove`;
  };

  this.getMovieHtml = function () {
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
          
        </button>
      </div>
      <p class="movie-results__plot">
       ${Plot}
      </p>
    </div>
  </li>
    `;
  };
}

function render() {}
