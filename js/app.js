import movieKey from "./key.js";
import Movie from "./Movie.js";

const movieIDs = [];
const movieInfoArr = [];
const movieWatchList = [];
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
    handleMovieData(data);
  }
}

// clear input field
function clearMovieInput() {
  movieSearchInput.value = "";
}

// get the movie data and add to array
function handleMovieData(data) {
  const { Title, Poster, Runtime, Genre, imdbRating, Year, Plot } = data;
  const newMovie = new Movie(
    Title,
    Poster,
    Runtime,
    Genre,
    imdbRating,
    Year,
    Plot
  );
  movieInfoArr.push(newMovie);
  //   console.log(movieInfoArr);
}
