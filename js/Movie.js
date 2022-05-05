class Movie {
  constructor(Title, Poster, Runtime, Genre, imdbRating, Year, Plot) {
    this.Title = Title;
    this.Poster = Poster;
    this.Runtime = Runtime;
    this.Genre = Genre;
    this.imdbRating = imdbRating;
    this.Year = Year;
    this.Plot = Plot;
    this.inWatchlist = false;
  }
}

export default Movie;
