import movieKey from "./key.js";
import Movie from "./Movie.js";
import { movieResultsHtml, watchlistHTML } from "./html.js";
import movieWatchListHandler from "./watchlistHandler.js";

let myWatchList = getWatchListFromLocalStorage();
let movieIDs = [];
let moviesResultsArr = [];
let searchHTML = "";
const movieForm = document.querySelector("#movie-form");
const movieSearchInput = movieForm.querySelector("#movie-search");
const movieListEl = document.querySelector(".movie-results__list");
const watchlistBtn = document.querySelector(".btn--header");

// if nothing is inside the watchlist
if (myWatchList === null) {
  myWatchList = saveWatchListToLocalStorage([]);
} else {
  myWatchList = getWatchListFromLocalStorage();
}

console.log(myWatchList);
// saveWatchListToLocalStorage(myWatchList);

// localStorage.setItem("test", JSON.stringify({ test: "my test" }));
// eventlistner for the search form
movieForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (movieSearchInput.value) {
    await searchMovieDB(movieKey, movieSearchInput.value);
    await getMovieInfoWithID(movieKey, movieIDs);
    renderMovies(movieListEl, searchHTML, moviesResultsArr, movieResultsHtml);

    movieWatchListHandler(movieListEl, moviesResultsArr, myWatchList);

    // renderMovies(watchListEl, watchHTML, movieWatchListArr, watchHTML);
  } else {
    console.log("Enter a movie title");
  }

  clearMovieInput();
});

watchlistBtn.addEventListener("click", async (e) => {});

// search movie db by input value
async function searchMovieDB(keyObj, searchTitle) {
  const res = await fetch(
    `http://www.omdbapi.com/?apikey=${keyObj.key}&s=${searchTitle}`
  );
  const data = await res.json();

  addMovieIDtoArray(data);
}

// using movie id to get more info about movie
async function getMovieInfoWithID(keyObj, movieIDs) {
  moviesResultsArr = [];
  for (let id of movieIDs) {
    const res = await fetch(
      `http://www.omdbapi.com/?apikey=${keyObj.key}&i=${id}`
    );
    const data = await res.json();
    storeMovieResults(data);
  }
}

// adding movie id to array
function addMovieIDtoArray(data) {
  // movieIDs = [];
  for (let item of data.Search) {
    movieIDs.push(item.imdbID);
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

//
export function updateWatchListButtonEl(event, type) {
  const text =
    type === "add"
      ? `<i class='bx bxs-minus-circle'></i> remove`
      : `<i class="bx bxs-plus-circle"></i> add to watchlist`;
  event.target.closest("li").querySelector(".btn--watchlist").innerHTML = text;
}
// render movies
export function renderMovies(el, htmlType, arr, func) {
  for (let movie of arr) {
    htmlType += func(movie);
  }
  el.innerHTML = htmlType;
}

// save array
export function saveWatchListToLocalStorage(arr) {
  localStorage.setItem("watchList", JSON.stringify(arr));
}

// get array
export function getWatchListFromLocalStorage() {
  return JSON.parse(localStorage.getItem("watchList"));
}

export function addMovieToWatchList(arr, id, watchList) {
  const movieInfo = arr.find((movie) => movie.imdbID === id);

  watchList.push({
    Poster: movieInfo.Poster,
    imdbID: movieInfo.imdbID,
    Title: movieInfo.Title,
  });
  saveWatchListToLocalStorage(watchList);
}

export function removeMovieFromWatchList(e) {
  const myWatchList = getWatchListFromLocalStorage();
  saveWatchListToLocalStorage(
    myWatchList.filter((movie) => movie.imdbID !== movieId)
  );
}
