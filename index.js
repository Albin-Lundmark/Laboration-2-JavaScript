/* Innehållsförteckning */
/* 1. Variabler för fetch */

/* 1. Variabler för fetch() */
/* Här skapar jag variabler som innehåller metod och header för mina fetch() */

const getMovies = async () => {
  try {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjU2ZDkzZGUxNGUwNmY0M2ZjYWZlYzBjMmVkZDA1YiIsInN1YiI6IjY1NDEwNTAxMzNhNTMzMDE0ZDQ2YjdlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-VhFqWT1Gq2DibxvzyqFN2kDbqOFUC44V7EOvjLgU9Y'
      }
    };
    const movieCarousel1 = document.querySelector('#movie-section-1')
    const movieCarousel2 = document.querySelector('#movie-section-2')
    const movieCarousel3 = document.querySelector('#movie-section-3')
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const data = response.data
    console.log(data)
    console.log(data.results[0].backdrop_path)
    const movieImgCar1 = await data.results.map((results) => {
      return `<img class="backdrop-image" alt="movie-poster" src="https://themoviedb.org/t/p/original${results.backdrop_path}">`
    })
    movieCarousel1.innerHTML = movieImgCar1.join('')

    const response2 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
    const data2 = response2.data
    const movieImgCar2 = await data2.results.map((results) => {
      return `<img class="backdrop-image" alt="movie-poster" src="https://themoviedb.org/t/p/original${results.backdrop_path}">`
    })
    movieCarousel2.innerHTML = movieImgCar2.join('')

    const response3 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', options)
    const data3 = response3.data
    const movieImgCar3 = await data3.results.map((results) => {
      return `<li><img class="backdrop-image" alt="movie-poster" src="https://themoviedb.org/t/p/original${results.backdrop_path}"></li>`
    })
    movieCarousel3.innerHTML = movieImgCar3.join('')
  }
  catch (error) {
    console.error('Fel:', error)
  }
}

getMovies()
//getMovie()
/* const searchMovie = () => {
  const searchInput = document.querySelector('#searchBar').addEventListener('input', (getMovie))

}
 */
