// genre list https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51&language=en-US
//api key api_key=30170f3751cc29da3d08369d25340c51
const URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=30170f3751cc29da3d08369d25340c51&language=en-US&with_genres=";

const mForm = document.querySelector(".movieForm");
console.log(mForm);
mForm.addEventListener("submit", fetchGenre);

function fetchGenre(e) {
  e.preventDefault();
  const genreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51";

  console.log("works");
  fetch(genreURL)
    .then((resp) => resp.json())
    .then((genreObj) => genreLookup(genreObj.genres));
}

function genreLookup(genreTable) {
  const genreOpt = document.querySelector("#genres");
  const genreName = genreOpt.options[genreOpt.selectedIndex].value;

  // console.log(genreTable[0].name)
  // console.log(genreTable)
  // console.log(genreName)

  const result = genreTable.filter(
    (genre) => genre.name.toLowerCase() === genreName
  );
  const movieId = result[0].id;

  fetchMovie(movieId);
}

function fetchMovie(genre) {
  const pageNo = Math.floor(Math.random() * 501) + 1;
  // console.log(genre);
  // console.log(pageNo);
  let requestURL = `${URL}${genre}&page=${pageNo}`;
  fetch(requestURL)
    .then((resp) => resp.json())
    .then(renderMovie);
  // console.log(requestURL)
  console.log(genre);
}

function renderMovie(movie) {
  // console.log(movie);
  // console.log(movie.results[0].original_title)

  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  if (movieCard.classList.contains("fade-in")) {
    movieCard.classList.remove("fade-in");
    movieCard.classList.add("fade-in");
  } else {
    movieCard.classList.add("fade-in");
  }

  const movieTitle = document.createElement("h2");
  movieTitle.className = "movie-title";

  const movieIndex = Math.floor(Math.random() * 21);
  movieTitle.innerText = movie.results[movieIndex].original_title;

  const moviePoster = document.createElement("img");
  const basePosterURL = "https://image.tmdb.org/t/p/w400";
  moviePoster.src = basePosterURL + movie.results[movieIndex].poster_path;
  moviePoster.className = "movie-poster";
  
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = " ";

  movieContainer.append(movieCard);

  const saveButton = document.createElement('button')
  saveButton.textContent = "Save"
  saveButton.addEventListener("click", e => saveMovie(movieCard))

  movieCard.append(movieTitle, moviePoster, saveButton);
  movieContainer.append(movieCard);
}

function saveMovie(movieCard) {
console.log(movieCard)
const movieListContainer = document.querySelector(".movieList")
movieListContainer.append(movieCard)

}


function leaveAReview() {
  const reviewForm = document.querySelector("#review-form");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleReview(e.target.new_review.value);
    reviewForm.reset();
  });
}

function handleReview(review) {
  const reviewLeft = document.createElement("p");
  reviewLeft.textContent = review;
  document.querySelector("#review-container").appendChild(reviewLeft);
}
