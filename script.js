fetch("movies.json")
  .then((reponse) => reponse.json())
  .then((movies) => {
    for (item of movies["results"]) {
      document.querySelector("#movie_section").innerHTML += `
        <div class="card col-lg-2 col-10 ">
         <img src="https://image.tmdb.org/t/p/w300${item.poster_path}" class="card-img-top" alt="...">
         <div class="card-body">
            <p class="card-text">${item.title}</p>
            <p class="card-text">${item.vote_average}/10</p>
         </div>
        </div>
        `;
    }
  });
