//require('dotenv').config();
//require('dotenv').config()
//import {OMDB_API_KEY} from './js/apikey.js';
const apiKey = "19817ab2";
var movieId = 0;

var doc = document.getElementById("input_search")
doc.addEventListener("click",getInputValue)

function getInputValue(){
  var movie = document.getElementById("input_movie").value;
  request(movie)
  console.log(movie)
};

const request = (movie) => {
  const requestUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(movie)}&type=movie&apikey=${apiKey}&page=1-100`;
  fetchOmdbApi(requestUrl);
};


async function fetchOmdbApi(requestUrl) {
  const response = await fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      const data = response;
      return data;
    })
    .catch((error) => console.error("Oula", error))
    .then((data) => showMovie(data));
    
}

async function showMovie(data){
  var title;
  var poster;
  var imdbID;
  var dataSearch = data.Search
    dataSearch.map((element) => {
      title = element.Title;
      poster = element.Poster;
      imdbID = element.imdbID;
      const requestUrl = `http://www.omdbapi.com/?i=${imdbID}&type=movie&type=series&apikey=${apiKey}`;
      fetchOmdbByTitle(requestUrl, title, poster, imdbID);
    });
  };
  

async function fetchOmdbByTitle(requestUrl, title, poster) {
  const response = await fetch(requestUrl)
    .then((response) => response.json())
    .then((response) => {
      console.log (response)
      return response
    })
    .then((response) => {
      
      displayMovie(title,poster,response)
      
    })
    .catch((error) => console.error("Error", error));
}


const displayMovie = (title,poster,response) =>{
var selector = document.getElementById('movie')
selector.insertAdjacentHTML("afterend", `  
<div class="column">
  <img src="${poster}>" </div>
  <div class="column">
    <h2>${title}</h2>
    <p>${response.Released}</p>

    <div class="btn">
      <button class="myBtn">Read More</button>
    </div>

    <div id="myModal" class="modal">
      <div class="modal-content">
        <div class="modal-body">
          <img src="${poster}">
          <h2>${title}</h2>
          <p>${response.Released}</p>
          <p> ${response.Plot} </p>
        </div>
      </div>
    </div>

  </div>

</div>

`);

scriptDisplayMovie()

}



const scriptDisplayMovie =()=>{
  
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.querySelector('button');
  
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("modal")[0];
  
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = "grid";
  }
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
}
