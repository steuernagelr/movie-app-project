// genre list https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51&language=en-US
//api key api_key=30170f3751cc29da3d08369d25340c51
const URL =
  // "https://api.themoviedb.org/3/discover/movie?api_key=30170f3751cc29da3d08369d25340c51&language=en-US&region=US&with_genres=";
  "https://api.themoviedb.org/3/discover/movie?api_key=30170f3751cc29da3d08369d25340c51&language=en-US&with_original_language=en&region=US&include_adult=false&include_video=false&with_genres=";

const mForm = document.querySelector(".movieForm");
console.log(mForm);
mForm.addEventListener("submit", fetchGenre);

fetchMyMovieList();

function fetchGenre(e) {
  e.preventDefault();
  const genreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51";
  fetch(genreURL)
    .then((resp) => resp.json())
    .then((genreObj) => genreLookup(genreObj.genres))
    .catch((err) => alert("Something went wrong, please refresh!"));
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
  const pageNo = Math.floor(Math.random() * 500) + 1;
  // console.log(genre);
  // console.log(pageNo);
  let requestURL = `${URL}${genre}&page=${pageNo}`;
  console.log(requestURL);
  fetch(requestURL)
    .then((resp) => resp.json())
    .then(randomize)
    .catch((err) => alert("Something went wrong, please refresh!"));
  // console.log(requestURL)
  //total_pages
}

function randomize(movies) {
  console.log(movies);
  const movieIndex = Math.floor(Math.random() * movies.results.length);
  console.log(movies.results.length);
  console.log(movieIndex);
  const movie = movies.results[movieIndex];
  // console.log(movie.results)
  renderMovie(movie);
}

function renderMovie(movie) {
  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieCard.id = "middle";
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

  const movieDesc = document.createElement("p");
  movieDesc.textContent = movie.overview;
  movieDesc.id = "";
  const movieDescBox = document.createElement("div");
  movieDescBox.id = "movie-desc-box";
  movieDescBox.append(movieDesc);

  moviePoster.src = basePosterURL + movie.poster_path;

  const imgURL = moviePoster.src;
  moviePoster.className = "movie-poster";
  moviePoster.id = "large";

  const movieContainer = document.querySelector(".movie-container");

  const saveBttn = document.createElement("button");
  saveBttn.textContent = "save to my list";
  saveBttn.addEventListener("click", (e) => saveMovie(e, movie));

  movieCard.append(movieTitle, moviePoster, saveBttn, movieDescBox);
  movieContainer.innerHTML = " ";
  movieContainer.append(movieCard);

  changeBG(imgURL);
}

function changeBG(moviePoster) {
  document.querySelector(
    ".background"
  ).style.backgroundImage = `linear-gradient(to bottom, crimson, transparent), url(${moviePoster})`;
}

function renderMyMovieList(movie) {
  const movieCard = document.createElement("div");
  movieCard.className = "movie-card";
  movieCard.id = movie.id;

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
  const basePosterURL = "https://image.tmdb.org/t/p/w500";

  moviePoster.src = basePosterURL + movie.poster_path;
  // const imgURL = moviePoster.src;
  moviePoster.className = "movie-poster";

  const movieList = document.querySelector(".movieList");
  const movieListH2 = document.createElement("h2");
  movieListH2.textContent = "My Movies";

  const reviewButton = document.createElement("button");
  reviewButton.textContent = "Add a review";
  reviewButton.classList.add("openBttn");
  // reviewButton.id = "openBttn"
  // reviewButton.id = movie.id;
  reviewButton.addEventListener("click", (e) => openTheForm(e, movieCard.id));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.id = "delete_movie";

  deleteButton.addEventListener("click", () => {
    movieCardContainer.remove();
    deleteMovie(movie.id);
  });

  function deleteMovie(id) {
    fetch(`http://localhost:3000/movieList/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((movie) => console.log(movie));
  }

  const movieCardContainer = document.createElement("div");
  movieCardContainer.classList.add("card-container");
  movieCardContainer.append(movieCard, reviewButton, deleteButton);
  movieCard.append(movieTitle, moviePoster);
  movieList.prepend(movieCardContainer);
  // const movieListh2 = document.createElement("h2")
  // movieListh2.textContent = "My Movies"
  // if (movieListh2.textcontent = "")
  // movieList.prepend(movieListh2)
  mcontainer = document.querySelector(".movie-container");
  mcontainer.innerHTML = "";
  // console.log(mcontainer);
}

function saveMovie(e, movie) {
  e.preventDefault();
  // console.log(movie);

  renderMyMovieList(movie);

  fetch("http://localhost:3000/movieList", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
}

function fetchMyMovieList() {
  fetch("http://localhost:3000/movieList")
    .then((resp) => resp.json())
    .then((o) => o.forEach(renderMyMovieList));
}

//   handleReview(e.target.new_review.value);
//   reviewForm.reset();
// });

function openTheForm(e) {
  console.log(e.target.id);
  document.getElementById("popupForm").style.display = "block";

  // fetch('http://localhost:3000/movieList/').then(resp => resp.json()).then(console.log)
  console.log("works");

  grabForm(e.target);
}

function grabForm(movieBttn) {
  const reviewForm = document.querySelector(".formContainer");
  // console.log(".formContainer");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleReview(e.target.new_review.value, movieBttn);
    reviewForm.reset();
    closeTheForm();
  });

  const cancelBtn = document.querySelector(".cancel");
  cancelBtn.addEventListener("click", closeTheForm);
}

function handleReview(review, movieBttn) {
  const userReview = document.createElement("p");
  userReview.id = "review";
  userReview.textContent = review;
  // userReview.setAttribute('id', movieCardId)

  console.log("LOOK HERE");

  const userReviewId = movieBttn.parentElement.querySelector(".movie-card");

  console.log(userReviewId);
  userReviewId.append(userReview);
  // console.log (`${movieCardId}`)
  console.log("works");
}

function closeTheForm() {
  document.getElementById("popupForm").style.display = "none";
}
