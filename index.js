/* Innehållsförteckning */
/* 1. Login Modal */
/* 2. Navbar */
/* 3. Variabler för fetch() */

/* 1.Login Modal */

/* 2. Navbar */

//Navbar försvinner ovanför skärmen när man scrollar
//Väljer ut navbar elementet från min HTML
const navbar = document.querySelector('#navbar')
const threshold = 50
let scrollpos = window.scrollY || window.pageYOffset
window.onscroll = () => {
  const currentScrollPos = window.scrollY || window.pageYOffset
  if (currentScrollPos > threshold) {
    if (scrollpos > currentScrollPos) {
      navbar.style.top = '0'
    } else {
      navbar.style.top = '-20vh'
    }
  } else {
    navbar.style.top = '0'
  }
  scrollpos = currentScrollPos;
}
/* 3. Variabler för fetch() */
/* Här skapar jag en funktion med async/await som innehåller min fetch() för filmer som ska visas på sidan och använder mig av en callback för att hämta filmerna asynkront */

const getMovies = async () => {
  try {
    //Skapar en variabel som innehåller API-nyckel för att kunna komma åt all data från det API jag har valt
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjU2ZDkzZGUxNGUwNmY0M2ZjYWZlYzBjMmVkZDA1YiIsInN1YiI6IjY1NDEwNTAxMzNhNTMzMDE0ZDQ2YjdlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-VhFqWT1Gq2DibxvzyqFN2kDbqOFUC44V7EOvjLgU9Y'
      }
    };
    //Hämtar in varje section där filmerna ska visas i variabler
    const movieCarousel1 = document.querySelector('#movie-section-1')
    const movieCarousel2 = document.querySelector('#movie-section-2')
    const movieCarousel3 = document.querySelector('#movie-section-3')

    //Använder mig av axios för min GET till önskat API
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const data = response.data
    //Loggar ut datan jag inhämtat för att se att det är rätt data
    console.log(data)
    console.log(data.results[0].backdrop_path)

    //Skapar en variabel som mapar den inhämtade datan till en ny array som jag sedan kan plocka ut datan ifrån och visa upp
    const movieImgCar1 = await data.results.map((results) => {
      return `<div><a href=""><img class="backdrop-image" alt="${results.original_title}" src="https://themoviedb.org/t/p/w220_and_h330_face${results.backdrop_path}"><p>${results.original_title}</p></a></div>`
    })

    //Kör metoden join() med en innerHTML för att skapa nya element
    movieCarousel1.innerHTML = movieImgCar1.join('')

    //Samma som ovan nämnda kod men för karusell 2
    const response2 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
    const data2 = response2.data
    const movieImgCar2 = await data2.results.map((results) => {
      return `<a href=""><img class="backdrop-image" alt="${results.original_title}" src="https://themoviedb.org/t/p/w220_and_h330_face${results.backdrop_path}"><p>${results.original_title}</p></a>`
    })
    movieCarousel2.innerHTML = movieImgCar2.join('')

    //Och här för karusell 3
    const response3 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', options)
    const data3 = response3.data
    const movieImgCar3 = await data3.results.map((results) => {
      return `<a href=""><img class="backdrop-image" alt="${results.original_title}" src="https://themoviedb.org/t/p/w220_and_h330_face${results.backdrop_path}"><p>${results.original_title}</p></a>`
    })
    movieCarousel3.innerHTML = movieImgCar3.join('')
  }
  //Loggar fel för att bättre kunna förstå om något inte går som jag vill
  catch (error) {
    console.error('Fel:', error)
  }
}
getMovies()
