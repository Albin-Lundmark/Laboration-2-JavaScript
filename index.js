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

//Hämtar alla element tillhörande formulär, inputs och errormeddelanden
const userName = document.querySelector('#name-input')
const password = document.querySelector('#password-input')
const personalPage = document.querySelector('#site-title')
const err = document.querySelector('.error')
const lengthErr = document.querySelector('#txt-err')
const numErr = document.querySelector('#num-err')
const upperCaseErr = document.querySelector('#UC-err')
const form = document.querySelector('#login-form')
const info = document.querySelector('#info')


//En funktion som kollar att lösenordsfältet innehåller vissa tecken
//annars visas felmeddelanden
const validate = () => {
  //Minst 5 tecken
  let lengthValidation = /^.{5,}$/
  //Minst en siffra
  let numValidation = /\d/
  //Minst en stor bokstav
  let upperCaseValidation = /[A-ZÅÄÖ]/
  //Boolean värde för att kunna returnera true eller false
  let valid = true
  //Visa inga felmeddelanden till att börja med
  lengthErr.style.display = 'none'
  numErr.style.display = 'none'
  err.style.display = 'none'
  upperCaseErr.style.display = 'none'
  info.style.display = 'none'
  //Kollar om lösenordet innehåller vissa kriterier med metoden match()
  if (!password.value.match(lengthValidation)) {
    err.style.display = 'block'
    lengthErr.style.display = 'block'
    valid = false
  }
  if (!password.value.match(numValidation)) {
    err.style.display = 'block'
    numErr.style.display = 'block'
    valid = false
  }
  if (!password.value.match(upperCaseValidation)) {
    err.style.display = 'block'
    upperCaseErr.style.display = 'block'
    valid = false
  }
  //Om lösenordet är giltigt returnera true
  return valid
}

//Om det finns sparad data från tidigare inlogg visas namnet upp på sidan
//den funktionaliteten väljer jag att lägga i en DOMContentLoaded() för att
//säkerställa att det visas som det ska om det skulle krocka nånstans i min asynkrona fetch()
document.addEventListener('DOMContentLoaded', () => {
  const savedUser = localStorage.getItem('username')
  if (savedUser) {
    personalPage.textContent = `${savedUser}'s filmerier`
  } else {
    personalPage.textContent = 'Albins filmerier'
  }

  //Lägger till en eventlyssnare på formuläret som visar värdet från userName på
  //webbsidan för att den ska kännas mer
  form.addEventListener('submit', (event) => {
    const remember = document.querySelector('#remember-me')
    let name = userName.value
    let pass = password.value
    console.log('Koden körs')
    if (validate(pass)) {
      console.log('Allt är som de ska', name)
      personalPage.textContent = `${name}'s filmerier`
      modal.close()
      //Sparar namn till localstorage när man har kryssrutan ikryssad för att
      //kunna visa den personliga sidan även om man skulle stänga ner och öppna upp sidan
      if (remember.checked) {
        console.log(remember.checked);
        localStorage.setItem('username', name)
      }
      //Resettar formuläret så att det visas som tomt om man öppnar Modalen igen
      form.reset()
      //Förhindrar att hela sidan laddas om
      event.preventDefault()
    } else {
      console.log('Lösen fel')
      info.style.display = 'block'
      event.preventDefault()
    }
  })
  userName.addEventListener('input', (validate))
  password.addEventListener('input', (validate))
})

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
  scrollPos = currentScrollPos
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
    const response2 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
    const data2 = response2.data
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
