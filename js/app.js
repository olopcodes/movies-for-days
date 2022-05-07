import movieKey from "./key.js";
import Movie from "./Movie.js";
import movieResultsHtml from "./html.js";
import movieWatchListHandler from "./watchlist.js";

const movieIDs = [];
const moviesResultsArr = [];
let movieWatchListArr = [];
const movieForm = document.querySelector("#movie-form");
const movieSearchInput = movieForm.querySelector("#movie-search");
const movieListEl = document.querySelector(".movie-results__list");

movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (movieSearchInput.value) {
    await searchMovieDB(movieKey, movieSearchInput.value);
    await getMovieInfoWithID(movieKey, movieIDs);
    let html = "";
    for (let movie of moviesResultsArr) {
      html += movieResultsHtml(movie);
    }
    renderMovies(html);
    movieWatchListHandler(movieListEl, moviesResultsArr, movieWatchListArr);
    // handleMovieToWatchList(moviesResultsArr, movieWatchListArr, movieResultEl);
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
}

function renderMovies(html) {
  movieListEl.innerHTML = html;
}
