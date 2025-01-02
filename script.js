
function show_movies() {
  document.querySelector("#movie_section").innerHTML="";
  fetch("movies.json")
  .then((reponse) => reponse.json())
  .then((movies) => {
    for (item of movies["results"]) {
      document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-10 ">
         <i title="Ajouter aux favoris" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
         <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
         <div class="card-body bg-dark ">
            <p class="card-text text-light">${item.title}</p>
            <p class="card-text1 text-light">${item.vote_average}/10 <i class="bi bi-star-fill text-warning"></i></p>
         </div>
        </div>
        `;
    }
  });
}
show_movies();

  document.querySelector('#upcoming_button').addEventListener('click', function(){
    document.querySelector("#movie_section").innerHTML="";
    fetch("nextMovies.json")
  .then((reponse) => reponse.json())
  .then((movies) => {
    for (item of movies["results"]) {
      document.querySelector("#movie_section").innerHTML += `
        <div class="card col-md-2 col-10 ">
         <i title="add to favorite" id="heart" class=" text-light fa-solid fa-heart position-absolute top-0 end-0 p-2"></i>
         <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="image du film : ${item.title}">
         <div class="card-body bg-dark ">
            <p class="card-text text-light">${item.title}</p>
            <p class="card-text1 text-light">${item.vote_average}/10 <i class="bi bi-star-fill text-warning"></i></p>
         </div>
        </div>
        `;
    }
  });
    
  })
  

