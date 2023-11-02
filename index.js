/* Innehållsförteckning */
/* 1. Variabler för fetch */

/* 1. Variabler för fetch() */
/* Här skapar jag variabler som innehåller metod och header för mina fetch() */

/* const movieGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 6f56d93de14e06f43fcafec0c2edd05b'
  }
}; */

/* const collection_id = fetch('https://api.themoviedb.org/3/movie/550?api_key=6f56d93de14e06f43fcafec0c2edd05b')
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

const movieData = fetch(`https://api.themoviedb.org/3/collection/{collection_id}`)


const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer 6f56d93de14e06f43fcafec0c2edd05b'
  }
};

fetch('https://api.themoviedb.org/3/collection/collection_id?language=en-US', options)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err)); */

const getMovie = async () => {
  try {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjU2ZDkzZGUxNGUwNmY0M2ZjYWZlYzBjMmVkZDA1YiIsInN1YiI6IjY1NDEwNTAxMzNhNTMzMDE0ZDQ2YjdlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-VhFqWT1Gq2DibxvzyqFN2kDbqOFUC44V7EOvjLgU9Y'
      }
    };
    const response = await axios.get('https://api.themoviedb.org/3/movie/changes?page=1', options)
    const data = response.data
    console.log(data)
  }
  catch (error) {
    console.error('Nåt är fel:', error)
  }
}

const searchMovie = () => {
  const searchInput = document.querySelector('#searchBar').addEventListener('input', (getMovie))

}
