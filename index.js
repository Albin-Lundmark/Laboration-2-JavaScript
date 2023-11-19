/* Innehållsförteckning */
/* 1. Login Modal */
/* 2. Navbar med sökruta */
/* 3. Fetch() för att visa upp filmer på sidan */

/* 1.Login Modal */

//Hämtar in element som hör till min modal
const modal = document.querySelector('.login-modal')
const openModalBtn = document.querySelector('#login-btn')
const closeModalBtn = document.querySelector('#abort-btn')
//Lägger till eventlyssnare som tack vare att jag använder mig av en <dialog> i HTML
//enkelt kan visa och stänga min modal genom funktionerna nedan
openModalBtn.addEventListener('click', () => {
  modal.showModal()
})
closeModalBtn.addEventListener('click', () => {
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
  //Kollar om lösenordet innehåller vissa kriterier
  //från variablerna ovan med metoden match()
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
    personalPage.textContent = 'Filmerier'
  }

  //Lägger till en eventlyssnare på formuläret som visar värdet från userName på
  //webbsidan för att den ska kännas mer personlig
  form.addEventListener('submit', (event) => {
    const remember = document.querySelector('#remember-me')
    let name = userName.value
    let pass = password.value
    if (validate(pass)) {
      personalPage.textContent = `${name}'s filmerier`
      modal.close()
      //Sparar namn till localstorage när man har kryssrutan ikryssad för att
      //kunna visa den personliga sidan även om man skulle stänga ner och öppna upp sidan
      if (remember.checked) {
        localStorage.setItem('username', name)
      }
      //Resettar formuläret så att det visas som tomt om man öppnar Modalen igen
      form.reset()
      //Förhindrar att hela sidan laddas om
      event.preventDefault()
    } else {
      info.style.display = 'block'
      event.preventDefault()
    }
  })
  userName.addEventListener('input', (validate))
  password.addEventListener('input', (validate))

  //Lägger till en knapp i formuläret där man kan välja att ta bort det sparade användarnamnet från localstorage
  const deleteBtn = document.querySelector('.delete-btn')
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      const confirmation = confirm('Är du säker på att du vill ta bort ditt sparade användarnamn?')
      if (confirmation) {
        //Om man väljer att ta bort användarnamnet, ta bort värde från localstorage och
        //resetta sidans personliga text
        localStorage.removeItem('username')
        personalPage.textContent = 'Filmerier'
      }
    })
  }
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

//Searchbar i min navbar
//Hämtar searchbaren från HTML dokumentet
const searchBar = document.querySelector('#search-bar')

//Skapar en funktion för min searchbar i navbaren med fetch()
const search = async () => {
  try {
    //Skapar en variabel som innehåller API-nyckel för att kunna komma åt all data från det API jag har valt
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjU2ZDkzZGUxNGUwNmY0M2ZjYWZlYzBjMmVkZDA1YiIsInN1YiI6IjY1NDEwNTAxMzNhNTMzMDE0ZDQ2YjdlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-VhFqWT1Gq2DibxvzyqFN2kDbqOFUC44V7EOvjLgU9Y'
      }
    }

    //Använder mig av axios för att köra mina GET requests
    const response1 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const response2 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
    const response3 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', options)

    //Tar ut datan från responsen
    const movies1 = response1.data.results
    const movies2 = response2.data.results
    const movies3 = response3.data.results

    //Använder concat för att sammanslå filmobjekten från olika sidor till 1 array
    const movieList = movies1.concat(movies2, movies3)

    //Hämtar in söktexten från search elementet och omvandlar texten till lowercase
    //samt tar bort whitespace före och efter så att sökningen inte ska vara case sensitive
    const searchText = searchBar.value.trim().toLowerCase()

    //Lägger till en if sats som skickar vidare till en funktion så att
    //sökningen rensar listan om ingen titel matchar
    if (searchText === '' || a) {
      clearSearch()
      return
    }

    //Filtrerar ut titlar efter titlar eller årtal/datum då filmen gjordes
    const movieSearch = movieList.filter(movie => movie.title.toLowerCase().includes(searchText) || movie.release_date.includes(searchText))

    //Skapar en funktion i min funktion som returnerar objekten i listan när man söker
    const createMovieHTML = (movie) => {
      return `<a class="searchbar-item" target="_blank" href="https://themoviedb.org/movie/${movie.id}">
                <img class="poster-image-searchbar" loading="lazy" alt="${movie.title}" src="https://themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}">
                <p class="movie-title-searchbar">${movie.title}</p>
                </a>
                <p>Filmen släpptes: ${movie.release_date}</p>`
    }
    //Skapar en lista att lägga in och visa upp sökningen i
    const searchResults = document.createElement('ul')

    //Lägger till sökningens träffar i listan
    movieSearch.forEach(movie => {
      const listItem = document.createElement('li')
      listItem.innerHTML = createMovieHTML(movie)
      searchResults.appendChild(listItem)
    })

    //Hämtar in elementet som listan ska visas i och appendar listan
    const searchResultElement = document.querySelector('#search-result')
    searchResultElement.innerHTML = ''

    //Ser till att listan inte ligger kvar om searchbaren är tom eller töms
    if (movieSearch.length > 0) {
      searchResultElement.appendChild(searchResults)
    }
  }
  catch (error) {
    console.error('Fel:', error)
  }
}

//Lägger till lyssnaren efter för att den ska kunna köra funktionen
searchBar.addEventListener('input', (search))

//Funktion som rensar listan i sökfältet när det är tomt
const clearSearch = () => {
  const searchResultElement = document.querySelector('#search-result')
  searchResultElement.innerHTML = ''
}

/* 3. Fetch() för att visa upp filmer på sidan */

/* Här skapar jag en funktion med async/await som innehåller hela min fetch() för filmer som ska visas på sidan och sedan använder jag mig av en callback för att hämta och visa upp filmerna asynkront på sidan */

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

    //Använder mig av axios med await för min GET till önskat API, använder options variabeln från ovan där jag lagt in API nyckeln
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
    const response2 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', options)
    const response3 = await axios.get('https://api.themoviedb.org/3/movie/popular?language=en-US&page=3', options)
    const data = response.data
    const data2 = response2.data
    const data3 = response3.data
    //Loggar ut datan jag inhämtat för att se att det är rätt data
    console.log(data, data2, data3)

    //Mapar den inhämtade datan till en ny array som jag visar upp genom innerHTML i karusellerna på sidan
    movieCarousel1.innerHTML = data.results.map((movie) => {
      return `<a href="https://themoviedb.org/movie/${movie.id}"><img class="poster-image" loading="lazy" alt="${movie.title}" src="https://themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}"><p class="movie-title">${movie.title}</p></a>`
    }).join('')

    //Mapar den inhämtade datan till en ny array som jag visar upp genom innerHTML i karusellerna på sidan
    movieCarousel2.innerHTML = data2.results.map((movie) => {
      return `<a href="https://themoviedb.org/movie/${movie.id}"><img class="poster-image" loading="lazy" alt="${movie.title}" src="https://themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}"><p class="movie-title">${movie.title}</p></a>`
    }).join('')

    //Mapar den inhämtade datan till en ny array som jag visar upp genom innerHTML i karusellerna på sidan
    movieCarousel3.innerHTML = data3.results.map((movie) => {
      return `<a href="https://themoviedb.org/movie/${movie.id}"><img class="poster-image" loading="lazy" alt="${movie.title}" src="https://themoviedb.org/t/p/w220_and_h330_face${movie.poster_path}"><p class="movie-title">${movie.title}</p></a>`
    }).join('')
  }
  //Loggar fel för att bättre kunna förstå om något inte går som jag vill
  catch (error) {
    console.error('Fel:', error)
  }
}
//Kör min fetch() som ligger i async funktionen getMovies()
getMovies()
