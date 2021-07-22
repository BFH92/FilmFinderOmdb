
const apiKey = "19817ab2";
var movieId = 0;

var doc = document.getElementById("input_search")
doc.addEventListener("click",getInputValue)
setInterval(function(){
  document.getElementById("input_search").disabled = false;
  document.getElementById("input_search").style.color ='green'
},10000)
function getInputValue(){
  var movie = document.getElementById("input_movie").value;
  
  request(movie)
  console.log(movie)
};

const request = (movie) => {
  const requestUrl = `https://www.omdbapi.com/?s=${encodeURIComponent(movie)}&type=movie&apikey=${apiKey}&page=1-100`;
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
    .then((data) => {
      if(data.Search != undefined){
        document.getElementById("input_search").disabled = true;
        document.getElementById("input_search").style.color ='red';
        showMovie(data);
      }else{
        alert("la requête est invalide")
      };
    });
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
  
  var btn = document.querySelector('button');
  
  var span = document.getElementsByClassName("modal")[0];
  
  btn.onclick = function() {
    modal.style.display = "grid";
  }
  
  span.onclick = function() {
    modal.style.display = "none";
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
}

var numSteps = 20.0;

var boxElement;
var prevRatio = 0.0;
var increasingColor = "rgba(40, 40, 190, ratio)";
var decreasingColor = "rgba(190, 40, 40, ratio)";


window.addEventListener("load", function(event) {
  boxElement = document.querySelector("#movie");

  createObserver();
}, false);

function createObserver() {
  var observer;

  var options = {
    root: null,
    rootMargin: "0px",
    threshold: buildThresholdList()
  };

  observer = new IntersectionObserver(handleIntersect, options);
  observer.observe(boxElement);
}

function buildThresholdList() {
  var thresholds = [];

  for (var i=1.0; i<=numSteps; i++) {
    var ratio = i/numSteps;
    thresholds.push(ratio);
  }

  thresholds.push(0);
  return thresholds;
}

function handleIntersect(entries, observer) {
  entries.forEach(function(entry) {
    if (entry.intersectionRatio > prevRatio) {
      entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
    } else {
      entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
    }

    prevRatio = entry.intersectionRatio;
  });
}