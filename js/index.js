//require('dotenv').config();
require('dotenv').config()
const request = () => {
  const apiKey = process.env.OMDB_API_KEY;
  const movie = "rambo";
  const year = "2020";

  const requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&${movie}&${year}`;
  fetchOmdbApi(requestUrl);
}
request()



async function fetchOmdbApi(requestUrl){
  
  const response = await fetch(requestUrl)
  .then((response) => response.json())
  .then((response) =>{
    const data = response
    return data
  })
  .then((data) => showMovie(data))
  .catch((error) => console.error("Error", error));
}

const showMovie = (data) => {
  const title = data.title
  const date = data.released
  const poster = data.poster

  console.log (title, date, poster)


}