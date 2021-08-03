// genre list https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51&language=en-US
//api key api_key=30170f3751cc29da3d08369d25340c51
const URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=30170f3751cc29da3d08369d25340c51&language=en-US&with_genres=";

const mForm = document.querySelector(".movieForm");
console.log(mForm);
mForm.addEventListener("submit", e => fetchGenre(e));

function fetchGenre(e) {
  e.preventDefault()
  const genreURL =
    "https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51";
  
    console.log("works")
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
  // const res = genreTable.forEach(e => {
  //   if (e.name.toLowerCase() === genreName)
  //   console.log(e.name.toLowerCase())
  //   return e.id
  // })

  // for (const genre in genreTable.genres) {
  //   console.log(`${genre}: ${genreTable[genre]}`);
}

// function selectGenre(e) {
//   e.preventDefault();
//   // let option = document.querySelector("option");
//   // const genre = option.value
//   const genreOpt = e.target.querySelector("#genres");
//   const genre = genreOpt.options[genreOpt.selectedIndex].value;
//   fetchMovie(genre);
//   console.log(genre);
// }

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
  // console.log(movieIndex);
  movieTitle.innerText = movie.results[movieIndex].original_title;

  const moviePoster = document.createElement("img");
  const basePosterURL = "https://image.tmdb.org/t/p/w400";
  moviePoster.src = basePosterURL + movie.results[movieIndex].poster_path;
  moviePoster.className = "movie-poster";
  // if (moviePoster.classList.contains("fade-in2")) {
  //   moviePoster.classList.remove("fade-in2");
  //   moviePoster.classList.add("fade-in2");
  // } else {
  //   moviePoster.classList.add("fade-in2");
  // }

  // console.log (random)
  console.log(moviePoster.src);
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = " ";

  movieCard.append(movieTitle, moviePoster);
  movieContainer.append(movieCard);
}

// fetch(requestURL).then(resp => resp.json()).then(console.log)
// console.log(requestURL)

// genres": [
//   {
//   "id": 28,
//   "name": "Action"
//   "id": 35,
//   "name": "Comedy"
//   "id": 99,
//   "name": "Documentary"
//   "id": 18,
//   "name": "Drama"
//   "id": 14,
//   "name": "Fantasy"
//   "id": 36,
//   "name": "History"
//   "id": 27,
//   "name": "Horror"
//   "id": 10402,
//   "name": "Music"
//   "id": 9648,
//   "name": "Mystery"
//   "id": 10749,
//   "name": "Romance"
//   "id": 878,
//   "name": "Science Fiction"
//   "id": 53,
//   "name": "Thriller"
//   ]
//   }
