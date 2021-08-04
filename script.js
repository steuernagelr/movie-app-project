// genre list https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51&language=en-US
//api key api_key=30170f3751cc29da3d08369d25340c51
const URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=30170f3751cc29da3d08369d25340c51&language=en-US&with_genres=";

const mForm = document.querySelector(".movieForm");
console.log(mForm);
mForm.addEventListener("submit", fetchGenre);

fetchMyMovieList()

function fetchGenre(e) {
  e.preventDefault();
  const genreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51";
  fetch(genreURL)
    .then((resp) => resp.json())
    .then((genreObj) => genreLookup(genreObj.genres));
}

function genreLookup(genreTable) {
  const genreOpt = document.querySelector("#genres");
  const genreName = genreOpt.options[genreOpt.selectedIndex].value;

  const result = genreTable.filter(
    (genre) => genre.name.toLowerCase() === genreName
  );
  const genreId = result[0].id;

  fetchMovie(genreId);
}

function fetchMovie(genre) {
  const pageNo = Math.floor(Math.random() * 501) + 1;
  // console.log(genre);
  // console.log(pageNo);
  let requestURL = `${URL}${genre}&page=${pageNo}`;
  fetch(requestURL)
    .then((resp) => resp.json())
    .then(randomize);
  // console.log(requestURL)
  console.log(genre);
}

function randomize(movies) {
  console.log(movies)
  const movieIndex = Math.floor(Math.random() * 21);
  console.log(movieIndex)
  const movie = movies.results[movieIndex]
  // console.log(movie.results)
  renderMovie(movie)
}

function renderMovie(movie) {
  // console.log(movie);
  // console.log(movie.results[0].original_title)
  console.log(movie)
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
  movieTitle.textContent = movie.original_title;

  const moviePoster = document.createElement("img");
  const basePosterURL = "https://image.tmdb.org/t/p/w400";

  const movieDesc = document.createElement("p")
  movieDesc.textContent = movie.overview

  moviePoster.src = basePosterURL + movie.poster_path;
  // const imgURL = moviePoster.src;
  moviePoster.className = "movie-poster";

  const movieContainer = document.querySelector(".movie-container");
  const saveBttn = document.createElement("button");
  saveBttn.textContent = "save to my list";
  saveBttn.addEventListener("click", (e) => saveMovie(e, movie));

  movieCard.append(movieTitle, moviePoster, movieDesc);
  movieContainer.innerHTML = " ";
  movieContainer.append(saveBttn, movieCard);
}

function renderMyMovieList(movie) {
  
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
  movieTitle.textContent = movie.original_title;

  const moviePoster = document.createElement("img");
  const basePosterURL = "https://image.tmdb.org/t/p/w400";

  moviePoster.src = basePosterURL + movie.poster_path;
  // const imgURL = moviePoster.src;
  moviePoster.className = "movie-poster";

  const movieList = document.querySelector(".movieList");
  const movieListH2 = document.createElement("h2")
  movieListH2.textContent = "My Movies"

  const reviewButton = document.createElement("button")
  reviewButton.setAttribute('id', 'review-button');
  reviewButton.textContent = "Add a review"
  // reviewButton.addEventListener(writeReview)

  const deleteButton = document.createElement("button")
  deleteButton.textContent = "Delete"

  const movieCardContainer = document.createElement("div")
  movieCardContainer.classList.add("card-container")
  movieCardContainer.append(movieCard, reviewButton, deleteButton)
  movieCard.append(movieTitle, moviePoster);
  movieList.prepend(movieCardContainer);
  // const movieListh2 = document.createElement("h2")
  // movieListh2.textContent = "My Movies"
  // if (movieListh2.textcontent = "")
  // movieList.prepend(movieListh2)
  mcontainer = document.querySelector(".movie-container")
  mcontainer.innerHTML = ""
  console.log(mcontainer)
}

// function writeReview() {

  
// }

function saveMovie(e, movie) {

  e.preventDefault()
  console.log(movie)

    renderMyMovieList(movie)
    fetch("http://localhost:3000/movieList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    })
}

function fetchMyMovieList() {
 
  fetch("http://localhost:3000/movieList")
    .then((resp) => resp.json())
    .then(o => o.forEach(renderMyMovieList));
}
// function saveMovie(e, movieCard) {
//   const movieContainer = document.querySelector(".movie-container");
//   movieContainer.innerHTML = " ";
//   e.preventDefault();
//   const movieList = document.querySelector(".movieList");

//   movieList.append(movieCard);
//   console.log(movieCard)
// }

const reviewForm = document.querySelector("#review-form");
console.log(reviewForm);

reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleReview(e.target.new_review.value);
  reviewForm.reset();
});

function handleReview(review) {
  const reviewLeft = document.createElement("p");
  reviewLeft.textContent = review;
  document.querySelector("#review-container").appendChild(reviewLeft);
}
