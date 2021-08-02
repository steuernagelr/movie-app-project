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
}
function fetchMovie(genre){
  const pageNo = Math.floor(Math.random() * 101)
  let requestURL = `${URL}${genre}&page=${pageNo}`
  fetch(requestURL).then(resp => resp.json()).then(console.log)
  console.log(requestURL)
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