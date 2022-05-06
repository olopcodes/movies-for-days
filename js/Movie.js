class Movie {
  constructor(imdbID, Title, Poster, Runtime, Genre, imdbRating, Plot) {
    this.imdbID = imdbID;
    this.Title = Title;
    this.Poster = Poster;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.imdbRating = imdbRating;
    this.Plot = Plot;
    this.inWatchlist = false;
  }
}

export default Movie;
