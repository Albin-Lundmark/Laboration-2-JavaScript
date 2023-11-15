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

const chart = async () => {
  try {
    //Skapar en variabel som innehåller API-nyckel för att kunna komma åt all data från det API jag har valt
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjU2ZDkzZGUxNGUwNmY0M2ZjYWZlYzBjMmVkZDA1YiIsInN1YiI6IjY1NDEwNTAxMzNhNTMzMDE0ZDQ2YjdlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-VhFqWT1Gq2DibxvzyqFN2kDbqOFUC44V7EOvjLgU9Y'
      }
    }
  }
