/* Innehållsförteckning */
/* 1. Login Modal */
/* 2. Navbar */
/* 3. Variabler för fetch() */

/* 1.Login Modal */

//Hämtar in alla element som hör till min modal
const modal = document.querySelector('.login-modal')
const openModalBtn = document.querySelector('#login-btn')
const closeModalBtn = document.querySelector('#abort-btn')
//Lägger till eventlyssnare som tack vare att jag använder mig av en <dialog> i HTML
//enkelt kan visa och stänga min modal genom funktionerna nedan
openModalBtn.addEventListener("click", () => {
  modal.showModal()
})
closeModalBtn.addEventListener("click", () => {
  modal.close()
})

//Hämtar och lägger till lyssnare på mina inputs för att kunna spara data till localstorage
//samt visa en personlig hälsning om man väljer att "logga in"
const userName = document.querySelector('#name-input')
const password = document.querySelector('#password-input')
const personalPage = document.querySelector('#site-title')
const err = document.querySelector('.error')
const lengthErr = document.querySelector('#txt-err')
const numErr = document.querySelector('#num-err')
const upperCaseErr = document.querySelector('#UC-err')
const form = document.querySelector('#login-form')

//En funktion som kollar att lösenordsfältet innehåller vissa tecken
//annars visas felmeddelanden
const validate = () => {
  let lengthValidation = /^.{5,}$/; // Minst 5 tecken
  let numValidation = /\d/; // Minst en siffra
  let upperCaseValidation = /[A-ZÅÄÖ]/; // Minst en stor bokstav
  //Visa inga felmeddelanden till att börja med
  lengthErr.style.display = 'none';
  numErr.style.display = 'none';
  err.style.display = 'none';
  //Kollar om lösenordet innehåller vissa kriterier med metoden match()
  if (!password.value.match(lengthValidation)) {
    err.style.display = 'block';
    lengthErr.style.display = 'block';
  }
  if (!password.value.match(numValidation)) {
    err.style.display = 'block'
    numErr.style.display = 'block'
  }
  if (!password.value.match(upperCaseValidation)) {
    err.style.display = 'block'
    upperCaseErr.style.display = 'block'
  }
}

form.addEventListener('submit', (event) => {
  if (!validate(password.value)) {
    event.preventDefault()
  }
  personalPage.textContent = `${userName.value}'s filmerier`
  modal.close()
  event.preventDefault()
  userName.value = ''
  password.value = ''
})
userName.addEventListener('input', (validate))
password.addEventListener('input', (validate))

/* 2. Navbar */

//Navbar försvinner ovanför skärmen när man scrollar
//Väljer ut navbar elementet från min HTML
const navbar = document.querySelector('#navbar')
const minScrollToHide = 50
let scrollPos = window.scrollY || window.pageYOffset
window.onscroll = () => {
  const currentScrollPos = window.scrollY || window.pageYOffset
  if (currentScrollPos > minScrollToHide) {
    if (scrollPos > currentScrollPos) {
      navbar.style.top = '0'
    } else {
      navbar.style.top = '-20vh'
    }
  } else {
    navbar.style.top = '0'
  }
  scrollPos = currentScrollPos;
}

//Skapar en funktion för min searchbar i navbaren
const search = (title) => {
  sessionStorage.getItem(title)
}

//Hämtar searchbaren från HTML och lägger till en lyssnare
const searchBar = document.querySelector('#search-bar').addEventListener('keydown', (event) => {
  if (event.target.value === 'Enter') {
    search()
  }
})

/* 3. Variabler för fetch() */

/* Här skapar jag en funktion med async/await som innehåller hela min fetch() för filmer som ska visas på sidan och sedan använder jag mig av en callback för att hämta och visa upp filmerna asynkront */

const getMovies = async () => {
  try {
    //Skapar en variabel som innehåller API-nyckel för att kunna komma åt all data från det API jag har valt
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjU2ZDkzZGUxNGUwNmY0M2ZjYWZlYzBjMmVkZDA1YiIsInN1YiI6IjY1NDEwNTAxMzNhNTMzMDE0ZDQ2YjdlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-VhFqWT1Gq2DibxvzyqFN2kDbqOFUC44V7EOvjLgU9Y'
      }
    }
    //Hämtar varje section från DOM där filmerna ska visas in i variabler
    const movieCarousel1 = document.querySelector('#movie-section-1')
    const movieCarousel2 = document.querySelector('#movie-section-2')
    const movieCarousel3 = document.querySelector('#movie-section-3')

    //Använder mig av axios med await för min GET till önskat API, använder options variabeln från ovan där jag lagt in API nyckel
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const data = response.data
    //Loggar ut datan jag inhämtat för att se att det är rätt data
    console.log(data)

    //Mapar den inhämtade datan till en ny array som jag visar upp genom innerHTML i den första karusellen på sidan
    movieCarousel1.innerHTML = data.results.map((results) => {
      return `<a href="https://themoviedb.org/movie/${results.id}"><img class="poster-image" loading="lazy" alt="${results.original_title}" src="https://themoviedb.org/t/p/w220_and_h330_face${results.poster_path}"><p class="movie-title">${results.title}</p></a>`
    }).join('')



    //Samma som ovan nämnda kod men för karusell 2
    const response2 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options);
    const data2 = response2.data;
    movieCarousel2.innerHTML = data2.results.map((result) => {
      return `<a href="https://themoviedb.org/movie/${result.id}"><img class="poster-image" loading="lazy" alt="${result.title}" src="https://themoviedb.org/t/p/w220_and_h330_face${result.poster_path}"><p class="movie-title">${result.title}</p></a>`
    }).join('')

    //Och här för karusell 3
    const response3 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', options)
    const data3 = response3.data
    movieCarousel3.innerHTML = data3.results.map((results) => {
      return `<a href="https://themoviedb.org/movie/${results.id}"><img class="poster-image" loading="lazy" alt="${results.title}" src="https://themoviedb.org/t/p/w220_and_h330_face${results.poster_path}"><p class="movie-title">${results.title}</p></a>`
    }).join('')
  }
  //Loggar fel för att bättre kunna förstå om något inte går som jag vill
  catch (error) {
    console.error('Fel:', error)
  }
}
//Kör min fetch() som ligger i funktionen getMovies()
getMovies()
