fetch(`https://api.themoviedb.org/3/movie/popular?api_key=30170f3751cc29da3d08369d25340c51&language=en-US`)
.then(res => res.json())
.then(movies => movies)

leaveAReview()

function leaveAReview(){
    const reviewForm = document.querySelector('#review-form')
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault()
        handleReview(e.target.new_review.value)
        reviewForm.reset()
    })
}

function handleReview(review){

    const reviewLeft = document.createElement('p')
    reviewLeft.textContent = review
    document.querySelector('#review-container').appendChild(reviewLeft)
}
