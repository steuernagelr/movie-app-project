// genre list https://api.themoviedb.org/3/genre/movie/list?api_key=30170f3751cc29da3d08369d25340c51&language=en-US

const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=30170f3751cc29da3d08369d25340c51&language=en-US&with_genres='

const mForm = document.querySelector(".movieForm")
console.log(mForm)
mForm.addEventListener("submit", selectGenre)


function selectGenre(e){
  e.preventDefault()
  // let option = document.querySelector("option");
  // const genre = option.value 
  const genreOpt = e.target.querySelector("#genres")
  const genre = genreOpt.options[genreOpt.selectedIndex].value
  fetchMovie(genre)
  console.log(genre)
}

function fetchMovie(genre){
  const pageNo = Math.floor(Math.random() * 501)
  let requestURL = `${URL}${genre}&page=${pageNo}`
  fetch(requestURL).then(resp => resp.json()).then(renderMovie)
  // console.log(requestURL)
}

function renderMovie(movie){
console.log(movie)
  // console.log(movie.results[0].original_title)

  const movieRec = document.createElement("div");
  movieRec.className = 'rec'
  const random = Math.floor(Math.random() * 21)
  movieRec.innerText = movie.results[random].original_title
  
  const moviePoster = document.createElement("img");
  const basePosterURL = 'https://image.tmdb.org/t/p/w500'
  moviePoster.src = basePosterURL+movie.results[random].poster_path
  moviePoster.className = "movie-poster";
  
  // console.log (random)
  console.log(moviePoster.src)
  const movieContainer = document.querySelector(".movie-container")
  movieContainer.innerHTML = ''
  movieContainer.append(movieRec, moviePoster)


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