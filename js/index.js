//require('dotenv').config();
require('dotenv').config()
//import {OMDB_API_KEY} from './js/apikey.js';
const apiKey = "19817ab2";
const request = (movie) => {
  //const apiKey = 


  const year = "2020";
  const page = "1"
  //const requestUrl = `http://www.omdbapi.com/?apikey=${apiKey}&${movie}&${year}`;
  //const requestUrl = `http://www.omdbapi.com/?t=${movie}&y=${year}&apikey=${apiKey}`;
  const requestUrl = `http://www.omdbapi.com/?s=${movie}&type=movie&apikey=${apiKey}`;
  fetchOmdbApi(requestUrl)
  
}
request(prompt("quel film ?"))



async function fetchOmdbApi(requestUrl){
  
  const response = await fetch(requestUrl)
  .then((response) => response.json())
  .then((response) =>{
    console.log (response)
    const data = response
    return data
  })
  .then((data) => showMovie(data))
  .catch((error) => console.error("Error", error));
}
var released = "";
async function fetchOmdbByTitle(requestUrl){
  
  const response = await fetch(requestUrl)
  .then((response) => response.json())
  .then((response) =>{
    //console.log (response.Released)
    released = response.Released;
    return released
  })
  .catch((error) => console.error("Error", error));

}


const showMovie = (data) => {
  
  data.Search.map((element)=>{
  const title = element.Title
  const poster = element.Poster
  const imdbID = element.imdbID
  const requestUrl =`http://www.omdbapi.com/?i=${imdbID}&type=movie&apikey=${apiKey}`
  fetchOmdbByTitle(requestUrl)
  let date = released
  console.log (date.type)
  })


}